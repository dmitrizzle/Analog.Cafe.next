let DOMAIN = {};
DOMAIN.PROTOCOL = {
  PRODUCTION: "https://",
  DEVELOPMENT: "http://"
};
DOMAIN.APP = {
  PRODUCTION: `www.analog.cafe`,
  DEVELOPMENT: `localhost:3000`
};
DOMAIN.API = {
  PRODUCTION: `api.analog.cafe`,
  DEVELOPMENT: `127.0.0.1:8080`
};

export { DOMAIN };

export const GOOGLE_SEARCH_API = "https://www.googleapis.com/customsearch/v1";
