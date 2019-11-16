import { API } from "../../../../constants/router/defaults";
import {
  ROUTE_FILTERS,
  ROUTE_LABELS,
  ROUTE_TAGS,
  ROUTE_COLLECTIONS,
} from "./constants";

export const getListMeta = (pathname = "/", page = 1) => {
  let request;
  let meta;
  page = parseInt(page);

  meta = ROUTE_LABELS[pathname] ? ROUTE_LABELS[pathname] : ROUTE_LABELS.default;

  const inferTagFromCollectionPathname = pathname => {
    const tagRoutes = Object.keys(ROUTE_TAGS);
    const tagRoute = tagRoutes.filter(route => pathname.includes(route))[0];
    return ROUTE_TAGS[tagRoute];
  };

  request = {
    params: {
      tag:
        ROUTE_TAGS[pathname] || inferTagFromCollectionPathname(pathname) || "",
      collection: ROUTE_COLLECTIONS[pathname] || "",
      authorship: ROUTE_FILTERS[pathname] || "",
      page,
    },
    url: pathname.includes("/account/all-submissions")
      ? API.SUBMISSIONS
      : API.LIST,
  };

  // user portfolios
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

  // returns path for favourites listings on account page
  if (pathname.includes("/account") && !pathname.includes("/all-submissions")) {
    meta = ROUTE_LABELS["/account"];
    request = {
      params: {
        page,
      },
      url: API.FAVOURITES,
    };
  }

  return { request, meta };
};
