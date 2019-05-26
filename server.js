const express = require("express");
const next = require("next");
const { join } = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const redirects = require("./constants/redirects.js");

app.prepare().then(() => {
  const server = express();

  redirects.forEach(({ from, to, type = 301, method = "get" }) => {
    server[method](from, (req, res) => {
      const newPathFragment = req.originalUrl.split(from.replace("*", ""))[1];
      const newPath = to.replace("*", newPathFragment);
      res.redirect(type, newPath);
    });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
