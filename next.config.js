const withPlugins = require("next-compose-plugins");
const offline = require("next-pwa");
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
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    register: true,
    runtimeCaching: [
      {
        // MUST be the same as "start_url" in manifest.json
        urlPattern: "/",
        // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
        // use StaleWhileRevalidate if you want to prompt user to reload when new version available
        handler: "StaleWhileRevalidate",
        options: {
          // don't change cache name
          cacheName: "start-url",
          expiration: {
            maxEntries: 1,
          },
        },
      },
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

// running this messes with offline tooling
// const bundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// transpile select modules into es5
// these modules are es6 or later and have to be transpiled for Internet Eplorer
const withTM = require("next-transpile-modules")([
  "@roast-cms/image-froth",
  "next-pwa",
  "url-pattern-match",
]);

module.exports = withPlugins(
  [
    withTM({
      future: {
        webpack5: true,
      },
    }),
    // [offline, offlineConfig],
  ],
  // [bundleAnalyzer, {}],
  [css, {}],
  nextConfig
);
