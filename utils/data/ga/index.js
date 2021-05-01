import lscache from "lscache";

import { getObjectFromUrlParams, getObjectToUrlParams } from "../../url";

const ga = (type, options) => {
  if (!process.browser) return;
  if (lscache.get("privacy-tools")?.ga === false) return;
  if (!window.ma) return console.warn("Analytics not ready.");
  const { category, action, label, value } = options;
  switch (type) {
    case "event":
      return window.ma && window.ma.trackEvent(category, action, label, value);
    // case "modalview":
    //   return ga && ga.modalview(options.url);
    // case "pageview":
    //   return ga && ga.pageview(options.url);
  }
  return null;
};

// remove set URL GET params from analytics requests
const SCRUB_URL_PARAMS = ["token", "r"];
export const scrub = url => {
  let cleanParams = {};
  const urlParamsObject = getObjectFromUrlParams(url);
  const urlNoQuery = url.split("?")[0];

  Object.keys(urlParamsObject).forEach(param => {
    if (!SCRUB_URL_PARAMS.includes(param))
      cleanParams[param] = urlParamsObject[param];
  });
  return `${urlNoQuery}?${getObjectToUrlParams(cleanParams)}`;
};

export default ga;
