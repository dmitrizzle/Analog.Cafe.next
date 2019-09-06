import {
  loadTextContent,
  loadContent,
} from "@roast-cms/french-press-editor/dist/utils/storage";
import axios from "axios";
import localForage from "localforage";

import { API } from "../constants/router/defaults";
import { loadHeader } from "./storage";

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
  console.log("isIncomplete");
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
  const insufficientText = data.plaintext.split(" ").length < 120;
  return (
    missingTitle ||
    insufficientText ||
    (imageKeys.length === 0 && imageSrcs.length === 0)
  );
};

export const uploadDraft = (data, handleUploadProgress) => {
  // send upload
  const request = {
    onUploadProgress: progressEvent => {
      handleUploadProgress((progressEvent.loaded * 100) / progressEvent.total);
    },
    url: API.SUBMISSIONS, // url/post-id for updating submissions/articles
    // url: submissions || articles
    method: "post", // put for updating submissions
    data,
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "JWT " + localStorage.getItem("token"),
    },
  };
  axios(request).then(response => {
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
      localStorage.removeItem(lsHeader);
      localStorage.removeItem(lsContent);
    }
  });
};
