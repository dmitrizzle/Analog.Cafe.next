const offline = require("next-pwa");
const withPlugins = require("next-compose-plugins");
const css = require("@zeit/next-css"); // required, otherwise fonts won't work

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
};

// PWA/Offline config
const offlineConfig = {
  pwa: {
    dest: "public",
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  },
};

module.exports = withPlugins([offline, offlineConfig], [css, {}], nextConfig);
