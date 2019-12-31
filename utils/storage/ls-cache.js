import lscache from "lscache";

import { DOMAIN } from "../../constants/router/defaults";

export const requestKey = request => {
  const u = request.url
    .replace(DOMAIN.API.PRODUCTION, "")
    .replace(DOMAIN.API.DEVELOPMENT, "")
    .replace(DOMAIN.PROTOCOL.PRODUCTION, "")
    .replace(DOMAIN.PROTOCOL.DEVELOPMENT);
  let p = "";
  request.params && Object.values(request.params).forEach(v => (p += v));
  return (u + p).replace(/[-\/\.\:]|undefined/g, "");
};

export const TTL_MINUTES = 5;

export const responseCache = {
  set: (request, response) =>
    lscache.set(requestKey(request), response, TTL_MINUTES),
  get: request => lscache.get(requestKey(request)),
};
