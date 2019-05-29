const redirects = [
  { from: "/zine/*", to: "/r/*" },
  { from: "/is/*", to: "/u/*" },
  { from: "/author/*", to: "/u/*" }
];

const masks = [
  { mask: "/u/:id", to: "/user-profile" },
  { mask: "/r/:slug", to: "/article" }
];

// const errors = [{ page: "/about", status: 404 }];

module.exports = {
  redirects,
  masks
};
