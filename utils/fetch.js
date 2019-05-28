import fetch from "unfetch";

export default (url, options = {}) => {
  const method = options.method || "GET";
  if (method === "GET" && options.params)
    url =
      url +
      "?" +
      Object.entries(options.params)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");

  return fetch(url, {
    method,
    headers: options.headers,
    body:
      options.params && method !== "GET"
        ? JSON.stringify(options.params)
        : undefined
  });
};
