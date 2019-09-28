const redirects = [
  { from: "/zine/*", to: "/r/*" },
  { from: "/is/*", to: "/u/*" },
  { from: "/author/*", to: "/u/*" },
  { from: "/submit/compose", to: "/submit/draft" },
  { from: "/sign-in", to: "/account" },
  { from: "/features", to: "/apps-and-downloads" },
];

const masks = [
  { mask: "/u/:id", to: "/user-profile" },
  { mask: "/r/:slug", to: "/article" },
  { mask: "/account/submission/:slug", to: "/account/submission" },
  { mask: "/download/:file", to: "/download" },
];

// add params to any page, derrived from masked url
const rewrites = [
  { url: "/film-photography", to: "/", params: { filter: "film-photography" } },
  { url: "/photo-essays", to: "/", params: { filter: "photo-essays" } },
  { url: "/editorials", to: "/", params: { filter: "editorials" } },
  { url: "/collaborations", to: "/", params: { filter: "collaborations" } },
  { url: "/solo-projects", to: "/", params: { filter: "solo-projects" } },
  { url: "/apps-and-downloads", to: "/", params: { filter: "apps-and-downloads" } },
];

// const errors = [{ page: "/about", status: 404 }];

module.exports = {
  redirects,
  masks,
  rewrites,
};
