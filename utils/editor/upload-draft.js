import axios from "axios";
import lscache from "lscache";

import localForage from "localforage";

import { API } from "../../constants/router/defaults";
import { clearComposerStorage } from "../storage/ls-user-session";

export default ({ data, setUploadProgress, id, status, handleError }) => {
  // soft limit uploads to one per 10 seconds using localStorage
  const lsTimeStamp = "upload-timestamp";
  const timeStamp = Math.floor(Date.now() / 1000);
  const timeStampLog = lscache.get(lsTimeStamp) || 0;
  if (timeStampLog + 10 > timeStamp) return;
  lscache.set(lsTimeStamp, timeStamp);

  // immediately set progress to 1% to signal that the upload has started
  // in the request, we're subtracting 1 from total to offset this value
  setUploadProgress(1);

  let url, method;
  // upload submission changes to published submission
  if (status === "published") {
    url = `${API.ARTICLES}/${id}`;
    method = "put";
  }
  // switch between updating and creating submissions
  else {
    url = API.SUBMISSIONS + (id ? `/${id}` : "");
    method = id ? "put" : "post";
  }

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
      Authorization: "JWT " + lscache.get("token"),
    },
  };

  // send upload
  axios(request)
    .then(response => {
      if (response.status === 200) {
        // remove plaintext and clear local images
        lscache.remove("composer-content-text");
        localForage.clear();

        // save backups and remove draft data
        clearComposerStorage();
      } else handleError(true);
    })
    .catch(() => handleError(true));
};
