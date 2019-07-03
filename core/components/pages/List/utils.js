import { API } from "../../../../constants/router/defaults";
import { ROUTE_FILTERS, ROUTE_LABELS, ROUTE_TAGS } from "./constants";

export const getListMeta = (pathname = "/", page = 1) => {
  let request;
  let meta;
  page = parseInt(page);

  meta = ROUTE_LABELS[pathname] ? ROUTE_LABELS[pathname] : ROUTE_LABELS.default;
  request = {
    params: {
      tag: ROUTE_TAGS[pathname] ? ROUTE_TAGS[pathname] : "",
      authorship: ROUTE_FILTERS[pathname] ? ROUTE_FILTERS[pathname] : "",
      page,
    },
    url: pathname.includes("/submissions") ? API.SUBMISSIONS : API.LIST,
  };

  if (pathname.includes("/u/")) {
    meta = ROUTE_LABELS["/u/*"];
    request = {
      params: {
        author: pathname.match(/\/u\/(.*)/)[1],
        page,
      },
      url: API.LIST,
    };
  }
  if (pathname.includes("/favourites") || pathname.includes("/account")) {
    meta = ROUTE_LABELS["/favourites"];
    request = {
      params: {
        page,
      },
      url: API.FAVOURITES,
    };
  }
  return { request, meta };
};
