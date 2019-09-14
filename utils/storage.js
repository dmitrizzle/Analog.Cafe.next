import throttle from "lodash/throttle";

import { INPUT_HEADER_DEFAULTS } from "../constants/composer";

// https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
export const base64ToBlob = string => {
  if (string instanceof Blob) return string;
  if (!string) return;

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

const lsHeader = "composer-header-state";
const lsContent = "composer-content-state";
const lsComposerData = "composer-data";

// composer header data
export const saveHeader = throttle(header => {
  const headerState = JSON.stringify(header);
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(lsHeader, headerState);
}, 1000);
export const loadHeader = () => {
  if (typeof localStorage === "undefined") return INPUT_HEADER_DEFAULTS;
  const local = localStorage.getItem(lsHeader);
  return local ? JSON.parse(local) : INPUT_HEADER_DEFAULTS;
};

// submission ID which may be saved in localstorage that links to original submission that's under edit
export const loadComposerData = () => {
  if (typeof localStorage === "undefined") return undefined;
  const local = localStorage.getItem(lsComposerData);
  return local ? JSON.parse(local) : {};
};
export const saveComposerData = data => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(lsComposerData, JSON.stringify(data));
};

// clear header, content, and submsision id data & back-up content
export const clearLocalStorage = () => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(`backup-${lsHeader}`, localStorage.getItem(lsHeader));
  localStorage.setItem(`backup-${lsContent}`, localStorage.getItem(lsContent));
  localStorage.removeItem(lsHeader);
  localStorage.removeItem(lsContent);
  localStorage.removeItem(lsComposerData);
};

export const getLocalSessionInfo = () => {
  if (typeof localStorage === "undefined") return {};
  const local = localStorage.getItem("session-info");
  return typeof local !== "undefined" && local !== "undefined"
    ? JSON.parse(local)
    : {};
};
