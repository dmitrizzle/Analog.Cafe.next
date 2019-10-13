const withCSS = require("@zeit/next-css");
const withOffline = require("next-offline");

module.exports = withOffline(
  withCSS({
    // eslint-disable-next-line
    webpack(config, options) {
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
  })
);
