// this function helps with refactoring

import { ROUTE_LABELS } from "../../pages/List/constants";

export const buttonMaker = (to, options = {}) => {
  let keywords = options.keywords || "";
  const attributes = options.attributes || {};
  if (ROUTE_LABELS[to]) {
    keywords =
      keywords +
      ROUTE_LABELS["/film-photography"].title +
      ROUTE_LABELS["/film-photography"].description;
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
