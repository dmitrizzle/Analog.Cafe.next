import {
  loadTextContent,
  loadContent,
} from "@roast-cms/french-press-editor/dist/utils/storage";
import axios from "axios";
import localForage from "localforage";
import throttle from "lodash/throttle";

import { API } from "../constants/router/defaults";
import { CONTENT_MIN_LENGTH } from "../constants/composer";
import { clearLocalStorage, loadHeader } from "./storage";

export const objectFromEditorImmutable = previousDataImmutable => {
  if (!previousDataImmutable) return undefined;
  const previousData = {
    feature: previousDataImmutable.get("feature"),
    file: previousDataImmutable.get("file"),
    src: previousDataImmutable.get("src"),
    key: previousDataImmutable.get("key"),
    caption: previousDataImmutable.get("caption"),
  };
  return previousData;
};

export const isIncompleteDraft = () => {
  const data =
    typeof localStorage === "undefined"
      ? {}
      : {
          header: loadHeader(),
          plaintext: loadTextContent(),
          content: loadContent(),
        };

  const imageKeys = data.content.document.nodes
    .filter(node => !!(node.data && node.data.key))
    .map(node => node.data.key);

  const imageSrcs = data.content.document.nodes
    .filter(node => !!(node.data && node.data.src))
    .map(node => node.data.src);

  const missingTitle = data.header.title.length < 3;
  const insufficientText =
    data.plaintext.split(" ").length < CONTENT_MIN_LENGTH;
  return (
    missingTitle ||
    insufficientText ||
    (imageKeys.length === 0 && imageSrcs.length === 0)
  );
};

export const uploadDraft = ({
  data,
  setUploadProgress,
  submissionId,
  handleError,
}) => {
  // immediately set progress to 1% to signal that the upload has started
  // in the request, we're subtracting 1 from total to offset this value
  setUploadProgress(1);

  // switch between updating and creating submissions
  const url = API.SUBMISSIONS + (submissionId ? `/${submissionId}` : "");
  const method = submissionId ? "put" : "post";

  // create request object
  const request = {
    onUploadProgress: progressEvent => {
      setUploadProgress((progressEvent.loaded * 99) / progressEvent.total + 1);
    },
    url,
    method,
    data,
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "JWT " + localStorage.getItem("token"),
    },
  };

  // send upload
  axios(request)
    .then(response => {
      if (response.status === 200) {
        // remove plaintext and clear local images
        localStorage.removeItem("composer-content-text");
        localForage.clear();

        // save backups and remove draft data
        const lsHeader = "composer-header-state";
        const lsContent = "composer-content-state";
        localStorage.setItem(
          `backup-${lsHeader}`,
          localStorage.getItem(lsHeader)
        );
        localStorage.setItem(
          `backup-${lsContent}`,
          localStorage.getItem(lsContent)
        );
        clearLocalStorage();
      } else handleError(true);
    })
    .catch(() => handleError(true));
};
