import lscache from "lscache";

import { DOMAIN } from "../../constants/router/defaults";

export const clearDomainString = string =>
  string
    .replace(DOMAIN.API.PRODUCTION, "")
    .replace(DOMAIN.API.DEVELOPMENT, "")
    .replace(DOMAIN.PROTOCOL.PRODUCTION, "")
    .replace(DOMAIN.PROTOCOL.DEVELOPMENT, "");

export const requestKey = request => {
  const u = clearDomainString(request.url);

  let p = "";
  request.params && Object.values(request.params).forEach(v => (p += v));
  return (u + p).replace(/[-/.:]|undefined/g, "");
};

export const TTL_MINUTES = 60 * 24;

export const responseCache = {
  set: (request, response, ttl = TTL_MINUTES) =>
    lscache.set(requestKey(request), response, ttl),
  get: request => lscache.get(requestKey(request)),
  remove: request => lscache.remove(requestKey(request)),
  flush: lscache.flushExpired,
};

// helper that cleans all list pages browsed caches
export const cleanListPageCaches = listRequest => {
  const requestWithoutPage = {
    ...listRequest,
    params: {
      ...listRequest.params,
      page: undefined,
    },
  };
  const listPagesSeen = lscache.get(`${requestKey(requestWithoutPage)}-pages`);
  for (let page = 1; page < (listPagesSeen || 0) + 1; page++) {
    responseCache.remove({
      ...requestWithoutPage,
      params: { ...requestWithoutPage.params, page },
    });
  }
};
