import UrlPattern from "url-pattern";

import { masks } from "../../../../constants/server-urls";

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

export const createMaskedURLLinkProps = href => {
  let maskToFile = href;
  masks.forEach(({ mask, to }) => {
    const pattern = new UrlPattern(mask);
    const params = pattern.match(href);
    if (params) {
      // process masked url
      console.log(1);
      maskToFile = `${to}?${shallowObjectToUrlParamsWithoutQuestionmark(
        params
      )}`;
      return;
    }
    return;
  });

  console.log(maskToFile);

  return maskToFile;
};
