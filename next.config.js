const css = require("@zeit/next-css");
const offline = require("next-offline");
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          // source files from static dir
          outputPath: "static/",
          publicPath: "/_next/static/",
          limit: 10000, // 10kb
        },
      },
    });
    return config;
  },
  generateInDevMode: true,
  devSwSrc: "/service-worker.js",
  workboxOpts: {},
};

const cssConfig = {};

module.exports = withPlugins([[offline], [css, cssConfig]], nextConfig);
