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

    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   "slate-react": path.join(
    //     __dirname,
    //     "./node_modules/slate-react-legacy/dist/slate-react.min.js"
    //   ),
    // };

    return config;
  },

  // workbox for next-offline
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200,
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

  // experimental nextjs features
  // experimental: {
  //   modern: true,
  // },
};

// css config, empty for styled-components
const cssConfig = {};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})({});

module.exports = withPlugins(
  [[offline], [css, cssConfig]],
  nextConfig,
  withBundleAnalyzer
);
