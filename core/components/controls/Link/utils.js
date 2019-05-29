import UrlPattern from "url-pattern";

import { masks, redirects } from "../../../../constants/server-urls";

export const makeRelative = (href = "#", domain) => {
  if (!domain) return href || "#";
  const apexName = domain.replace("www.", "");
  let address = href;
  address = address
    .replace("http://" + apexName, "")
    .replace("https://" + apexName, "")
    .replace("http://www." + apexName, "")
    .replace("https://www." + apexName, "");
  return address;
};

export const shallowObjectToUrlParamsWithoutQuestionmark = object => {
  let string = "";
  Object.keys(object).forEach(key => {
    string !== "" ? (string += "&") : null;
    string += `${key}=${object[key]}`;
  });
  return string;
};

export const processRedirectedURLs = href => {
  let pathway = href;
  // NOTE: this only works for a single (*)
  redirects.forEach(({ from, to }) => {
    let fromFormatted = from.replace("*", "(.*?)");
    const match = new RegExp(`^${fromFormatted}$`, "g");
    pathway = pathway.replace(match, to.replace("*", "$1"));
  });
  return pathway;
};

export const createMaskedURLLinkProps = href => {
  // process redirected urls
  const pathway = processRedirectedURLs(href);
  let maskToFile = pathway;

  // convert masked URL to real route to /pages component
  masks.forEach(({ mask, to }) => {
    const pattern = new UrlPattern(mask);
    const params = pattern.match(pathway);
    if (params) {
      // process masked url
      maskToFile = `${to}?${shallowObjectToUrlParamsWithoutQuestionmark(
        params
      )}`;
      return;
    }
    return;
  });

  return maskToFile;
};
