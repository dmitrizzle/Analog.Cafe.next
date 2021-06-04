export const DOMAIN = {
  PROTOCOL: {
    PRODUCTION: "https://",
    DEVELOPMENT: "http://",
    TEST: "http://",
  },
  APP: {
    PRODUCTION: "www.analog.cafe",
    DEVELOPMENT: "localhost:3000",
    TEST: "localhost:3000",
  },
  API: {
    PRODUCTION: "api.analog.cafe",
    DEVELOPMENT: "127.0.0.1:8080",
    TEST: "api.analog.cafe",
  },
};

// running in test mode by default
const mode = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : "TEST";

const base = DOMAIN.PROTOCOL[mode] + DOMAIN.API[mode];
export const API = {
  ADS: base + "/ads",
  ETSY: base + "/etsy",
  ETSY_CACHE: base + "/etsy/cache",
  LIST: base + "/list", // general lists for all articles
  SUBMISSIONS: base + "/submissions",
  FAVOURITES: base + "/favourites", // list
  FAVOURITE: base + "/favourite", // single item & actions on favourites
  AUTHORS: base + "/authors",
  ARTICLES: base + "/articles", // will get appended to fetch specific articles
  IMAGES: base + "/images",
  PROFILE: base + "/users/me",
  MEMBERS: base + "/users",
  UNSUBSCRIBE: base + "/emails/unsubscribe",
  UNSUBSCRIBE_USER: base + "/emails/unsubscribe-user",
  SUBSCRIBE_USER: base + "/emails/subscribe-user",
  SUBSCRIPTIONS: base + "/emails/list-subscriptions",
  AUTH: {
    USER: base + "/auth/user",
    VIA_TWITTER: base + "/auth/twitter",
    VIA_FACEBOOK: base + "/auth/facebook",
    VIA_EMAIL: base + "/auth/email",
  },
};
