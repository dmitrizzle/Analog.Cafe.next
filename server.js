const cacheableResponse = require("cacheable-response");
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
  cacheable,
} = require("./constants/router/transformations.js");

const server = express();

// set up server middlewares
const compression = require("compression");
const url = require("url");
const cookieParser = require("cookie-parser");
server.use(
  // parse cookies
  cookieParser(),

  // remove 'force' parm from urls to avoid unnecessary cache busting
  // NOTE: set cookie name 'admin' to any value to enable cache busting
  (req, res, next) => {
    if (!req.cookies.admin && req.query.force) {
      return res.redirect(301, url.parse(req.url).pathname);
    }
    next();
  },

  // use GZip compression
  compression()
);

// handle GET request to /service-worker.js
const sw = "/service-worker.js";
server.get(sw, (req, res) => {
  res.sendFile(join(__dirname, ".next", sw));
});

// error code factory
const renderError = (pathExpression, statusCode) => {
  server.get(pathExpression, (req, res) => {
    res.status(statusCode);
    app.render(req, res, "pages/_error");
  });
};

// cache
const ssrCache = cacheableResponse({
  // 1hour
  ttl: 1000 * 60 * 60,
  get: async ({ req, res, to, queryParams }) => {
    const data = await app.renderToHTML(req, res, to, queryParams);
    let ttl;
    if (
      res.statusCode === 404 ||
      res.statusCode === 400 ||
      res.statusCode === 500
    )
      ttl = 1;
    return { data, ttl };
  },
  send: ({ data, res }) => {
    return res.status(res.statusCode).send(data);
  },
});

app.prepare().then(() => {
  // cache static assets
  if (!dev) {
    server.get(/^\/_next\/static\//, (_, res, nextHandler) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      nextHandler();
    });
  }

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
        const queryParams = { ...req.params, ...req.query };
        ssrCache({ req, res, to, queryParams });
        // app.render(req, res, to, { ...req.params, ...req.query });
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
        const queryParams = { ...req.params, ...req.query, ...params };
        ssrCache({ req, res, to, queryParams });
        // app.render(req, res, to, { ...req.params, ...req.query, ...params });
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

  // add cache to remaining pages
  cacheable &&
    cacheable.forEach(to => {
      server.get(to, (req, res) => {
        const queryParams = { ...req.params, ...req.query };
        ssrCache({ req, res, to, queryParams });
      });
    });

  server.get("*", (req, res) => {
    const originalHostname = req.hostname;

    // redirect herokuapp
    if (originalHostname === "analog-cafe-next.herokuapp.com") {
      res.redirect(301, "https://" + DOMAIN_APP_PRODUCTION + req.url);
    }

    // redirect to HTTPS (Heroku)
    const proto = req.headers["x-forwarded-proto"];
    if (proto && proto !== "https") {
      res.redirect(301, "https://" + DOMAIN_APP_PRODUCTION + req.url);
    }

    // return all other pages
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
