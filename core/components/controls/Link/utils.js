import urlPatternMatch from "url-pattern-match";

import {
  masks,
  redirects,
  rewrites,
} from "../../../../constants/router/transformations";

export const makeRelative = (href = "#", domain) => {
  if (!domain) return href || "#";
  const apexName = domain.replace("www.", "");
  let address = href || "#";
  address = address
    .replace("http://" + apexName, "")
    .replace("https://" + apexName, "")
    .replace("http://www." + apexName, "")
    .replace("https://www." + apexName, "");
  return address;
};

export const extractHostnameFromUrl = url => {
  let hostname;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];

  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
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
  // change "as" to redirected routes
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
    // dots in string trip up regex, they are temporarily replaced with underscores
    const safeParams = urlPatternMatch(
      mask,
      pathway.replace(/\./g, "~")
    ).children;

    if (Object.keys(safeParams).length) {
      // replace underscores with dots
      let params = {};
      Object.keys(safeParams).forEach(key => {
        params[key] = safeParams[key].replace(/~/g, ".");
      });

      // process masked url
      maskToFile = `${to}?${shallowObjectToUrlParamsWithoutQuestionmark(
        params
      )}`;
      return;
    }
    return;
  });

  // for filtered list routes
  const listFiltered = rewrites.filter(
    rewrite => rewrite.url === maskToFile
  )[0];
  maskToFile = listFiltered
    ? "/?filter=" +
      listFiltered.params.filter +
      (listFiltered.params.collection
        ? "&collection=" + listFiltered.params.collection
        : "")
    : maskToFile;

  return maskToFile;
};
