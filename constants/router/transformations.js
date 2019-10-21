const redirects = [
  { from: "/zine/*", to: "/r/*" },
  { from: "/is/*", to: "/u/*" },
  { from: "/author/*", to: "/u/*" },
  { from: "/submit/compose", to: "/submit/draft" },
  { from: "/sign-in", to: "/account" },
  { from: "/features", to: "/" },
  { from: "/download/*", to: "/links-and-downloads" },
  { from: "/downloads", to: "/links-and-downloads" },
  { from: "/_error", to: "/error" },
];

const masks = [
  { mask: "/u/:id", to: "/user-profile" },
  { mask: "/r/:slug", to: "/article" },
  { mask: "/account/submission/:slug", to: "/account/submission" },
];

// add params to any page, derrived from masked url
const rewrites = [
  { url: "/film-photography", to: "/", params: { filter: "film-photography" } },
  { url: "/photo-essays", to: "/", params: { filter: "photo-essays" } },
  { url: "/editorials", to: "/", params: { filter: "editorials" } },
  { url: "/collaborations", to: "/", params: { filter: "collaborations" } },
  { url: "/solo-projects", to: "/", params: { filter: "solo-projects" } },
  {
    url: "/links-and-downloads",
    to: "/",
    params: { filter: "links-and-downloads" },
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
};
