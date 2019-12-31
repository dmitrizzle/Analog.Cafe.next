import lscache from "lscache";

export const requestKey = request => {
  const u = request.url.replace(/[-\/\.0-9http\:]/g, "");
  let p;
  Object.values(request.params).forEach(v => (p += v));
  return u + p;
};

export const TTL_MINUTES = 5;

export const responseCache = {
  set: (request, response) =>
    lscache.set(requestKey(request), response, TTL_MINUTES),
  get: request => lscache.get(requestKey(request)),
};
