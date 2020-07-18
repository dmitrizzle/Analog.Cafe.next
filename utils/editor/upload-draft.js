import axios from "axios";
import localForage from "localforage";

import { API } from "../../constants/router/defaults";
import { clearLocalStorage } from "../storage/ls-user-session";
import ls from "../storage/ls";

export default ({ data, setUploadProgress, id, status, handleError }) => {
  // soft limit uploads to one per 10 seconds using localStorage
  const lsTimeStamp = "upload-timestamp";
  const timeStamp = Math.floor(Date.now() / 1000);
  const timeStampLog = parseInt(ls.getItem(lsTimeStamp) || 0);
  if (timeStampLog + 10 > timeStamp) return;
  ls.setItem(lsTimeStamp, timeStamp);

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
      Authorization: "JWT " + ls.getItem("token"),
    },
  };

  // send upload
  axios(request)
    .then(response => {
      if (response.status === 200) {
        // remove plaintext and clear local images
        ls.removeItem("composer-content-text");
        localForage.clear();

        // save backups and remove draft data
        const lsHeader = "composer-header-state";
        const lsContent = "composer-content-state";
        ls.setItem(`backup-${lsHeader}`, ls.getItem(lsHeader));
        ls.setItem(`backup-${lsContent}`, ls.getItem(lsContent));
        clearLocalStorage();
      } else handleError(true);
    })
    .catch(() => handleError(true));
};
