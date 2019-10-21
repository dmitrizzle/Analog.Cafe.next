import throttle from "lodash/throttle";

import { INPUT_HEADER_DEFAULTS } from "../../constants/messages/system";

const lsHeader = "composer-header-state";
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
