import Router from "next/router";

import ls from "../storage/ls";
import throttle from "lodash/throttle";

export default (type, options) => {
  if (ls.getItem("ga-enabled") !== "false") {
    import("react-ga").then(ga => {
      switch (type) {
        case "event":
          return ga && ga.event(options);
        case "modalview":
          return ga && ga.modalview(options.url);
        case "pageview":
          return ga && ga.pageview(options.url);
      }
      return null;
    });
  }
};

const scrub = url => {
  return url.indexOf("?token=") > 0
    ? url.substring(0, url.indexOf("?token="))
    : url;
};
export const analytics = asPath => {
  if (ls.getItem("ga-enabled") !== "false") {
    import("react-ga").then(ga => {
      ga.initialize("UA-91374353-3", {
        debug: process.env.NODE_ENV === "development",
        testMode: process.env.NODE_ENV === "test",
        titleCase: false,
        gaOptions: {},
        gaAddress: "/static/analytics-201808051558.js",
      });

      ga.pageview(scrub(asPath));

      Router.events.on(
        "routeChangeComplete",
        throttle(() => {
          return ga.pageview(scrub(window.location.pathname));
        }, 100)
      );
    });
  }
};
