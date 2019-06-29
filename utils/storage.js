import throttle from "lodash/throttle";

import { INPUT_HEADER_DEFAULTS } from "../user/constants/slate-document-rules";

// https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
export const base64ToBlob = string => {
  if (string instanceof Blob) return string;

  let byteString;
  if (string.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(string.split(",")[1]);
  else byteString = unescape(string.split(",")[1]);
  const mimeString = string
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
};

export const saveHeader = throttle(header => {
  const headerState = JSON.stringify(header);
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("composer-header-state", headerState);
}, 1000);

export const loadHeader = () => {
  if (typeof localStorage === "undefined") return INPUT_HEADER_DEFAULTS;
  let local = localStorage.getItem("composer-header-state");
  return local ? JSON.parse(local) : INPUT_HEADER_DEFAULTS;
};

export const clearLocalStorage = () => {
  if (typeof localStorage === "undefined") return;

  const lsHeader = "composer-header-state";
  const lsContent = "composer-content-state";
  localStorage.setItem(`backup-${lsHeader}`, localStorage.getItem(lsHeader));
  localStorage.setItem(`backup-${lsContent}`, localStorage.getItem(lsContent));
  localStorage.removeItem(lsHeader);
  localStorage.removeItem(lsContent);
};

export const getLocalSessionInfo = () => {
  if (typeof localStorage === "undefined") return;

  localStorage.getItem("session-info")
    ? JSON.parse(localStorage.getItem("session-info"))
    : {};
};
