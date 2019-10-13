const create = new Promise((resolve, reject) => {
  if (localStorage.getItem("ga-enabled") !== "false")
    import("react-ga").then(ReactGA => {
      resolve(ReactGA);
    });
  else reject();
});

export const initializeGA = () =>
  typeof localStorage !== "undefined"
    ? create
        .then(ReactGA => {
          ReactGA.initialize("UA-91374353-3", {
            debug: process.env.NODE_ENV === "development",
            titleCase: false,
            gaOptions: {},
            gaAddress: "/static/analytics-201808051558.js",
          });
        })
        .catch(() => {})
    : null;

export const pageviewGA = url => {
  create
    .then(ReactGA => {
      ReactGA.pageview(
        url || window.location.pathname + window.location.search
      );
    })
    .catch(() => {});
};

export const modalviewGA = loc => {
  create
    .then(ReactGA => {
      ReactGA.modalview(loc);
    })
    .catch(() => {});
};

export const eventGA = options => {
  create
    .then(ReactGA => {
      ReactGA.event(options);
    })
    .catch(() => {});
};
