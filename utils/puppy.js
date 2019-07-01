import "isomorphic-unfetch";

// wrapper for fetch
export default (options = {}) => {
  let url = options.url;
  const params = options.params || options.body || options.data || {};
  const method = options.method || "GET";

  if (method === "GET" && params)
    url =
      url +
      "?" +
      Object.entries(params)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");

  return fetch(url, {
    method,
    headers: options.headers,
    body: params && method !== "GET" ? JSON.stringify(params) : undefined,
  });
};
