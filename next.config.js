const css = require("@zeit/next-css");
const offline = require("next-offline");
const withPlugins = require("next-compose-plugins");

// next config for general options
const nextConfig = {
  // webpack config
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

  // workbox for next-offline
  workboxOpts: {},
};

// css config, empty for styled-components
const cssConfig = {};

module.exports = withPlugins([[offline], [css, cssConfig]], nextConfig);
