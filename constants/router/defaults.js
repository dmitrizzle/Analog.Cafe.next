export const DOMAIN = {
  PROTOCOL: {
    PRODUCTION: "https://",
    DEVELOPMENT: "http://",
  },
  APP: {
    PRODUCTION: `www.analog.cafe`,
    DEVELOPMENT: `localhost:3000`,
  },
  API: {
    PRODUCTION: `api.analog.cafe`,
    DEVELOPMENT: `127.0.0.1:8080`,
  },
};

const mode = process.env.NODE_ENV.toUpperCase();
const base = DOMAIN.PROTOCOL[mode] + DOMAIN.API[mode];
export const API = {
  ADS: base + "/ads",
  LIST: base + "/list",
  SUBMISSIONS: base + "/submissions",
  FAVOURITES: base + "/favourites", // list
  FAVOURITE: base + "/favourite", // single item & actions on favourites
  AUTHORS: base + "/authors",
  ARTICLES: base + "/articles",
  IMAGES: base + "/images",
  PROFILE: base + "/users/me",
  AUTH: {
    USER: base + "/auth/user",
    VIA_TWITTER: base + "/auth/twitter",
    VIA_FACEBOOK: base + "/auth/facebook",
    VIA_EMAIL: base + "/auth/email",
  },
};
