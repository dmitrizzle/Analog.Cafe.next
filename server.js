const express = require("express");
const next = require("next");
const proxyMiddleware = require("http-proxy-middleware");

const { join } = require("path");

const DOMAIN_APP_PRODUCTION = "www.analog.cafe";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const {
  redirects,
  masks,
  rewrites,
  proxies,
} = require("./constants/router/transformations.js");

// setup server and add GZip compression
const compression = require("compression");
const server = express();
server.use(compression());

// error code factory
const renderError = (pathExpression, statusCode) => {
  server.get(pathExpression, (req, res) => {
    res.status(statusCode);
    app.render(req, res, "_error");
  });
};

app.prepare().then(() => {
  // handle GET request to /service-worker.js
  const sw = "/service-worker.js";
  server.get(sw, (req, res) => {
    app.serveStatic(req, res, join(__dirname, ".next", sw));
  });

  // no trailing slashes
  server.get("/?[^]*//", (req, res) => {
    if (req.url.substr(-1) === "/" && req.url.length > 1)
      res.redirect(301, req.url.slice(0, -1));
  });

  // handle all 301 redirects
  redirects &&
    redirects.forEach(({ from, to, type = 301, method = "get" }) => {
      server[method](from, (req, res) => {
        const newPathFragment = req.originalUrl.split(from.replace("*", ""))[1];
        const newPath = to.replace("*", newPathFragment);
        res.redirect(type, newPath);
      });
    });

  // apply URL masks
  masks &&
    masks.forEach(({ mask, to }) => {
      server.get(mask, (req, res) => {
        app.render(req, res, to, { ...req.params, ...req.query });
      });
      // 404s for remaining page fragments:
      // send 404 to root folder, i.e.: /u will give 404 but /u/:id will work
      renderError(mask.substring(0, mask.indexOf("/:")), 404);
      // send 404 to file name in "to", could be same as root folder
      renderError(to + "*", 404);
    });

  // apply URL rewrites (a more direct mask)
  rewrites &&
    rewrites.forEach(({ url, to, params }) => {
      server.get(url, (req, res) => {
        app.render(req, res, to, { ...req.params, ...req.query, ...params });
      });
    });

  // handle proxied requests
  proxies &&
    proxies.forEach(({ from, to }) => {
      server.use(
        proxyMiddleware(to, {
          target: from,
          changeOrigin: true,
          pathRewrite: { ["^" + to]: "/" },
        })
      );
    });

  server.get("*", (req, res) => {
    const originalHostname = req.hostname;

    // redirect to HTTPS (Heroku)
    // redirect herokuapp
    const proto = req.headers["x-forwarded-proto"];
    if (
      (proto && proto !== "https") ||
      originalHostname === "analog-cafe-next.herokuapp.com"
    ) {
      res.redirect(301, "https://" + DOMAIN_APP_PRODUCTION + req.url);
    }

    // redirect signed-in users
    if (req.query && req.query.token && !req.url.includes("/account")) {
      res.redirect(302, "/account?token=" + req.query.token);
    }

    // return all other pages
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
