export default (type, options) => {
  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("ga-enabled") !== "false"
  ) {
    import("react-ga").then(ga => {
      switch (type) {
        case "event":
          return ga && ga.event(options);
        case "modalview":
          return ga && ga.modalview(options.url);
      }
      return null;
    });
  }
};
