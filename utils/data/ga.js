import Router from "next/router";
import lscache from "lscache";

export default (type, options) => {
  if (lscache.get("privacy-tools")?.ga !== false) {
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
  if (lscache.get("privacy-tools")?.ga !== false) {
    if (window["react-ga-ready"]) return;

    import("react-ga").then(ga => {
      window["react-ga-ready"] = true;
      ga.initialize("UA-91374353-3", {
        debug: process.env.NODE_ENV === "development",
        testMode: process.env.NODE_ENV === "test",
        titleCase: false,
        gaOptions: {},
        gaAddress: "/static/analytics-201808051558.js",
      });

      ga.pageview(scrub(asPath));

      Router.events.on("routeChangeComplete", () => {
        return ga.pageview(scrub(window.location.pathname));
      });
    });
  }
};
