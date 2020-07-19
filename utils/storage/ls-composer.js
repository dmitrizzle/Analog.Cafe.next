import throttle from "lodash.throttle";

import { INPUT_HEADER_DEFAULTS } from "../../constants/messages/system";
import ls from "./ls";

const lsHeader = "composer-header-state";
const lsComposerData = "composer-data";

// composer header data
export const saveHeader = throttle(header => {
  const headerState = JSON.stringify(header);
  ls.setItem(lsHeader, headerState);
}, 1000);
export const loadHeader = () => {
  if (!process.browser) return INPUT_HEADER_DEFAULTS;
  const local = ls.getItem(lsHeader);
  return local ? JSON.parse(local) : INPUT_HEADER_DEFAULTS;
};

// submission ID which may be saved in localstorage that links to original submission that's under edit
export const loadComposerData = () => {
  if (!process.browser) return undefined;
  const local = ls.getItem(lsComposerData);
  return local ? JSON.parse(local) : {};
};
export const saveComposerData = data => {
  if (!process.browser) return;
  ls.setItem(lsComposerData, JSON.stringify(data));
};
