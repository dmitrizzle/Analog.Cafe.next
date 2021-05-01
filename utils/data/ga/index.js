import lscache from "lscache";
import throttle from "lodash.throttle";

import { getObjectFromUrlParams, getObjectToUrlParams } from "../../url";

const ga = throttle((type, options) => {
  if (!process.browser) return;
  if (lscache.get("privacy-tools")?.ga === false) return;
  if (!window.ma) return;
  const { category, action, label, value } = options;
  switch (type) {
    case "event":
      return window.ma && window.ma.trackEvent(category, action, label, value);
    case "modalview":
      return (
        window.ma &&
        window.ma.trackPageview(
          "/modal" + (options.url ? "/" + options.url : "")
        )
      );
    // case "pageview":
    //   return ga && ga.pageview(options.url);
  }
  return null;
}, 100);

// remove set URL GET params from analytics requests
const SCRUB_URL_PARAMS = ["token", "r"];
export const scrub = url => {
  let cleanParams = {};
  const urlParamsObject = getObjectFromUrlParams(url);
  const urlNoQuery = url.split("?")[0];

  if (!urlParamsObject) return url;

  Object.keys(urlParamsObject).forEach(param => {
    if (!SCRUB_URL_PARAMS.includes(param))
      cleanParams[param] = urlParamsObject[param];
  });
  return `${urlNoQuery}?${getObjectToUrlParams(cleanParams)}`;
};

export default ga;
