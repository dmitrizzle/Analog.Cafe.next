const redirects = [
  { from: "/zine/*", to: "/r/*" },
  { from: "/is/*", to: "/u/*" },
  { from: "/author/*", to: "/u/*" },
  { from: "/submit/compose", to: "/submit/draft" },
];

const masks = [
  { mask: "/u/:id", to: "/user-profile" },
  { mask: "/r/:slug", to: "/article" },
  { mask: "/download/:file", to: "/download" },
];

// mostly to send filter as param to index page
const rewrites = [
  { url: "/film-photography", to: "/", params: { filter: "film-photography" } },
  { url: "/photo-essays", to: "/", params: { filter: "photo-essays" } },
  { url: "/editorials", to: "/", params: { filter: "editorials" } },
  { url: "/collaborations", to: "/", params: { filter: "collaborations" } },
];

// const errors = [{ page: "/about", status: 404 }];

module.exports = {
  redirects,
  masks,
  rewrites,
};
