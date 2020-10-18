// these pages are not mentioned in redirects and masks
// which are cached automatically
const cacheable = ["/", "/about"];

const redirects = [
  { from: "/is/*", to: "/u/*" },
  { from: "/author/*", to: "/u/*" },
  { from: "/submit", to: "/write" },
  { from: "/submit/compose", to: "/write/draft" },
  { from: "/sign-in", to: "/account" },
  { from: "/features", to: "/" },
  { from: "/zine/*", to: "/r/*" },
  { from: "/download/*", to: "/apps-and-downloads" },
  { from: "/downloads", to: "/apps-and-downloads" },
  { from: "/printables-and-downloads", to: "/apps-and-downloads" },
  { from: "/links-and-downloads", to: "/apps-and-downloads" },
  { from: "/_error", to: "/error" },
  { from: "/r/film-cameras-ex2r", to: "/film-photography/cameras" },
  { from: "/r/35mm-film-price-guide-6zt1", to: "/app/35mm-film-price-guide" },
];

const masks = [
  { mask: "/u/:id", to: "/user-profile" },
  { mask: "/r/:slug", to: "/article" },
  { mask: "/account/submission/:slug", to: "/account/submission" },
];

// add params to any page, derrived from masked url
const rewrites = [
  { url: "/film-photography", to: "/", params: { filter: "film-photography" } },
  {
    url: "/film-photography/cameras",
    to: "/",
    params: { filter: "film-photography", collection: "cameras" },
  },
  {
    url: "/film-photography/books-and-magazines",
    to: "/",
    params: {
      filter: "film-photography",
      collection: "books-and-magazines",
    },
  },
  {
    url: "/film-photography/film-and-chemistry",
    to: "/",
    params: {
      filter: "film-photography",
      collection: "film-and-chemistry",
    },
  },
  {
    url: "/film-photography/guides",
    to: "/",
    params: { filter: "film-photography", collection: "guides" },
  },
  //
  { url: "/photo-essays", to: "/", params: { filter: "photo-essays" } },
  {
    url: "/photo-essays/health-environment-humanity",
    to: "/",
    params: {
      filter: "photo-essays",
      collection: "health-environment-humanity",
    },
  },
  {
    url: "/photo-essays/travel",
    to: "/",
    params: { filter: "photo-essays", collection: "travel" },
  },
  {
    url: "/photo-essays/portraits",
    to: "/",
    params: { filter: "photo-essays", collection: "portraits" },
  },
  //
  { url: "/editorials", to: "/", params: { filter: "editorials" } },
  { url: "/collaborations", to: "/", params: { filter: "collaborations" } },
  { url: "/solo-projects", to: "/", params: { filter: "solo-projects" } },
  {
    url: "/apps-and-downloads",
    to: "/",
    params: { filter: "apps-and-downloads" },
  },
];

const proxies = [
  { from: "https://api.analog.cafe/rss", to: "/rss" },
  // { from: "http://localhost:8080/rss", to: "/rss" }, // dev
  { from: "https://api.analog.cafe/sitemap.xml", to: "/sitemap.xml" },
];

module.exports = {
  redirects,
  masks,
  rewrites,
  proxies,
  cacheable,
};
