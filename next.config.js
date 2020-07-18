const withPlugins = require("next-compose-plugins");
const offline = require("next-pwa");
const css = require("@zeit/next-css"); // required, otherwise fonts won't work
const bundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

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
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    runtimeCaching: [
      {
        urlPattern: /api.analog.cafe/,
        handler: "NetworkFirst",
        options: {
          cacheName: "apiCache",
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
      {
        urlPattern: /\.(?:woff|woff2|png|gif|jpg|jpeg|webp|svg)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "fontImageCache",
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "staticScripts",
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
    ],
  },
};

module.exports = withPlugins(
  [bundleAnalyzer, {}],
  [offline, offlineConfig],
  [css, {}],
  nextConfig
);
