import lscache from "lscache";
import throttle from "lodash.throttle";

import { INPUT_HEADER_DEFAULTS } from "../../constants/messages/system";

const STORAGE_HEADER_STATE = "composer-header-state";
const STORAGE_COMPOSER_DATA = "composer-data";

// composer header data
export const saveHeader = throttle(header => {
  lscache.set(STORAGE_HEADER_STATE, header);
}, 1000);
export const loadHeader = () => {
  if (!process.browser) return INPUT_HEADER_DEFAULTS;
  return lscache.get(STORAGE_HEADER_STATE) || INPUT_HEADER_DEFAULTS;
};

// submission ID which may be saved in localstorage that links to original submission that's under edit
export const loadComposerData = () => {
  if (!process.browser) return;
  return lscache.get(STORAGE_COMPOSER_DATA);
};
export const saveComposerData = data => {
  if (!process.browser) return;
  return lscache.set(STORAGE_COMPOSER_DATA, data);
};
