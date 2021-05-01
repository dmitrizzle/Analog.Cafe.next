import lscache from "lscache";

const ga = (type, options) => {
  if (lscache.get("privacy-tools")?.ga === false) return;
  if (!window.ma) return console.warn("Analytics not ready.");
  const { category, action, label, value } = options;
  switch (type) {
    case "event":
      return window.ma && window.ma.trackEvent(category, action, label, value);
    // case "modalview":
    //   return ga && ga.modalview(options.url);
    // case "pageview":
    //   return ga && ga.pageview(options.url);
  }
  return null;
};

const scrub = url => {
  return url.indexOf("?token=") > 0
    ? url.substring(0, url.indexOf("?token="))
    : url;
};

export default ga;
