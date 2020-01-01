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
  set: (request, response) =>
    lscache.set(requestKey(request), response, TTL_MINUTES),
  get: request => lscache.get(requestKey(request)),
  remove: request => lscache.remove(requestKey(request)),
  flush: lscache.flush,
};
