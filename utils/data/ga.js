const create = new Promise(resolve => {
  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("ga-enabled") !== "false"
  )
    import("react-ga").then(ReactGA => {
      resolve(ReactGA);
    });
  else resolve(null);
});

export const initializeGA = () =>
  typeof localStorage !== "undefined"
    ? create.then(ga => {
        ga &&
          ga.initialize("UA-91374353-3", {
            debug: process.env.NODE_ENV === "development",
            titleCase: false,
            gaOptions: {},
            gaAddress: "/static/analytics-201808051558.js",
          });
      })
    : null;

export const pageviewGA = url => {
  create.then(ga => {
    ga && ga.pageview(url || window.location.pathname + window.location.search);
  });
};

export const modalviewGA = loc => {
  create.then(ga => {
    ga && ga.modalview(loc);
  });
};

export const eventGA = options => {
  create.then(ga => {
    ga && ga.event(options);
  });
};
