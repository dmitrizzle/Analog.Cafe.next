// this function helps with refactoring

import { ROUTE_MESSAGES } from "../../../../constants/messages/system";

export const buttonMaker = (to, options = {}) => {
  let keywords = options.keywords || "";
  const attributes = options.attributes || {};
  if (ROUTE_MESSAGES[to]) {
    keywords =
      keywords +
      ROUTE_MESSAGES["/film-photography"].title +
      ROUTE_MESSAGES["/film-photography"].description;
  }
  return {
    to,
    text:
      options.text ||
      to
        .replace("-", " ")
        .replace("/", "")
        .replace(/\b\w/g, l => l.toUpperCase()),
    keywords,
    ...attributes,
  };
};
