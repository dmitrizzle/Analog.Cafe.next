// wrapper for fetch
const puppy = (options = {}) => {
  let url = options.url;
  let body, headers;
  const params = options.params || options.body || options.data || {};
  const method = options.method || "GET";

  // get requests have no body
  if (method.toUpperCase() === "GET" && params) {
    url =
      url +
      "?" +
      Object.entries(params)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
    headers = options.headers;
  }

  // form data requests have no JSON.stringify method attached
  else if (
    options.headers &&
    options.headers["Content-Type"] === "multipart/form-data"
  ) {
    body = params;
    headers = options.headers;
    // we have to let browser automatically set this header,
    // otherwise errors occur
    delete headers["Content-Type"];
  }

  // typical requests stringify JSON in body
  else {
    body = JSON.stringify(params);
    headers = options.headers;
  }

  return fetch(url, { method, headers, body });
};
export default puppy;
