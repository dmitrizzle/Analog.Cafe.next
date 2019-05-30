const express = require("express");
const next = require("next");
const { join } = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { redirects, masks } = require("./constants/server-urls.js");
const server = express();

// error code factory
const renderError = (pathExpression, statusCode) => {
  server.get(pathExpression, (req, res) => {
    res.status(statusCode);
    app.render(req, res, "_error");
  });
};

app.prepare().then(() => {
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
        app.render(req, res, to, req.params);
      });
      // 404s for remaining page fragments:
      // send 404 to root folder, i.e.: /u will give 404 but /u/:id will work
      renderError(mask.substring(0, mask.indexOf("/:")), 404);
      // send 404 to file name in "to", could be same as root folder
      renderError(to + "*", 404);
    });

  server.get("*", (req, res) => {
    // no trailing slashes
    const test = /\?[^]*\//.test(req.url);
    if (req.url.substr(-1) === "/" && req.url.length > 1 && !test)
      res.redirect(301, req.url.slice(0, -1));

    // return all other pages
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
