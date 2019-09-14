import axios from "axios";
import localForage from "localforage";

import { API } from "../../constants/router/defaults";
import { clearLocalStorage } from "../storage";

export default ({ data, setUploadProgress, id, handleError }) => {
  // soft limit uploads to one per 10 seconds using localStorage
  const lsTimeStamp = "upload-timestamp";
  const timeStamp = Math.floor(Date.now() / 1000);
  const timeStampLog = parseInt(localStorage.getItem(lsTimeStamp) || 0);
  if (timeStampLog + 10 > timeStamp) return;
  localStorage.setItem(lsTimeStamp, timeStamp);

  // immediately set progress to 1% to signal that the upload has started
  // in the request, we're subtracting 1 from total to offset this value
  setUploadProgress(1);

  // switch between updating and creating submissions
  const url = API.SUBMISSIONS + (id ? `/${id}` : "");
  const method = id ? "put" : "post";

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
