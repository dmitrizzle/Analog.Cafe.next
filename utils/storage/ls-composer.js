import throttle from "lodash.throttle";

import { INPUT_HEADER_DEFAULTS } from "../../constants/messages/system";
import ls from "./ls";

const lsHeader = "composer-header-state";
const lsComposerData = "composer-data";

// composer header data
export const saveHeader = throttle(header => {
  lscache.set(lsHeader, header);
}, 1000);
export const loadHeader = () => {
  if (!process.browser) return INPUT_HEADER_DEFAULTS;
  const local = lscache.set(lsHeader);
  return local ? local : INPUT_HEADER_DEFAULTS;
};

// submission ID which may be saved in localstorage that links to original submission that's under edit
export const loadComposerData = () => {
  if (!process.browser) return undefined;
  const local = lscache.get(lsComposerData);
};
export const saveComposerData = data => {
  if (!process.browser) return;
  lscache.set(lsComposerData, data);
};
