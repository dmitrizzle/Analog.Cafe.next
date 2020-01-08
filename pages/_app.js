import "typeface-exo-2";
import "typeface-lora";

import { DefaultSeo } from "next-seo";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App from "next/app";
import React from "react";
import Router, { withRouter } from "next/router";

import { CssBody } from "../constants/styles/global";
import { DOMAIN } from "../constants/router/defaults";
import { NAME } from "../constants/messages/system";
import { NAV_MIN_MAP } from "../constants/router/breadcrumbs";
import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { c_red } from "../constants/styles/colors";
import { getJsonFromUrl } from "../utils/url";
import { getUserInfo } from "../user/store/actions-user";
import AppLoader from "../core/components/layouts/Main/components/AppLoader";
import ClientLoader from "../core/components/layouts/Main/components/ClientLoader";
import Footer from "../core/components/layouts/Main/components/Footer";
import ModalOverlay from "../core/components/controls/Modal/components/ModalOverlay";
import Nav from "../core/components/controls/Nav";
import withReduxStore from "../utils/with-redux-store";

const navConfigDefault = {
  showBrandName: false,
  tallMargin: false,
  isMinimal: false,
};
const navConfigMinimal = {
  ...navConfigDefault,
  isMinimal: true,
};
const navConfigHidden = {
  ...navConfigMinimal,
  isHidden: true,
};
const navConfigList = {
  isMinimal: false,
  showBrandName: true,
  tallMargin: true,
};

// nav rules and exceptions
const mapPathnameToNavConfig = pathname => {
  let isMinimalNavigation =
    NAV_MIN_MAP[
      Object.keys(NAV_MIN_MAP).filter(key => pathname.indexOf(key) !== -1)[0]
    ];

  if (pathname === "/") return navConfigList;
  if (pathname.indexOf("/write/upload") !== -1) return navConfigHidden;
  if (pathname.indexOf("/account/all-submissions") !== -1) return navConfigList;
  if (pathname.indexOf("/account/bookmarks") !== -1) return navConfigList;

  // submissions should show regular nav
  if (pathname.indexOf("/account/submission") !== -1) return navConfigDefault;

  return isMinimalNavigation ? navConfigMinimal : navConfigDefault;
};

const scrub = url => {
  return url.indexOf("?token=") > 0
    ? url.substring(0, url.indexOf("?token="))
    : url;
};

class AnalogCafeApp extends App {
  componentDidMount = () => {
    // this helps with managing :active pseudoclass on iOS
    document.body.addEventListener("touchstart", function() {}, false);

    // if (this.props.router.query.collection)
    // history.scrollRestoration = "manual";

    // write login token
    const urlParamsJson = getJsonFromUrl(window.location.search);
    if (urlParamsJson && urlParamsJson.token) {
      localStorage.setItem("token", urlParamsJson.token);
    }

    // fetch user info
    if (localStorage.getItem("token"))
      this.props.reduxStore.dispatch(getUserInfo());

    // configure nav on client
    this.mapPathnameToNavConfigClient = pathname => {
      if (pathname === "/account" && localStorage.getItem("token")) {
        return navConfigDefault;
      }
    };
    this.forceUpdate(); // required to apply client nav config

    // data
    // if (localStorage.getItem("fullstory-enabled") !== "false") {
    //   import("../utils/data/fullstory").then(FullStory => {
    //     FullStory.default();
    //   });
    // }

    // start Google Analytics tracker
    if (localStorage.getItem("ga-enabled") !== "false") {
      import("react-ga").then(ga => {
        ga.initialize("UA-91374353-3", {
          debug: process.env.NODE_ENV === "development",
          titleCase: false,
          gaOptions: {},
          gaAddress: "/static/analytics-201808051558.js",
        });

        ga.pageview(scrub(this.props.router.asPath));

        Router.events.on("routeChangeComplete", () => {
          return ga.pageview(scrub(window.location.pathname));
        });
      });
    }

    // polyfills
    const polyfillDelay = setTimeout(() => {
      // conditionally load smooth scroll polyfillDelay
      clearTimeout(polyfillDelay);
      if ("scrollBehavior" in document.documentElement.style) return;
      import("smoothscroll-polyfill").then(smoothscroll => {
        smoothscroll.polyfill();
      });
    }, 1000);

    // remove user tokens from url
    if (this.props.router.asPath.indexOf("?token=") !== -1) {
      Router.push("/account");
      return;
    }
  };

  componentWillUnmount() {
    this._ismounted = false;
  }

  render() {
    const { Component, pageProps, reduxStore, router } = this.props;

    let deepRoute = router.pathname;
    if (pageProps.error) deepRoute = "/_error";

    const navConfig =
      (typeof this.mapPathnameToNavConfigClient !== "undefined" &&
        this.mapPathnameToNavConfigClient(deepRoute)) ||
      mapPathnameToNavConfig(deepRoute);

    const seo = {
      title: TEXT_EMOJIS.MONOCLE,
      titleTemplate: "%s — " + NAME,
      canonical:
        DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION + router.asPath ||
        router.path,
      // DOMAIN.PROTOCOL.PRODUCTION +
      //   "analog-cafe-next.herokuapp.com" +
      //   router.asPath || router.path,
    };

    return (
      <>
        <Provider store={reduxStore}>
          <ThemeProvider
            theme={{
              accent: c_red,
            }}
          >
            <>
              <DefaultSeo
                title={seo.name}
                titleTemplate={seo.titleTemplate}
                description={seo.description}
                canonical={seo.canonical}
                twitter={{
                  site: "@analog_cafe",
                  cardType: "summary_large_image",
                }}
              />
              <CssBody />
              <AppLoader />
              <Nav {...navConfig} />
              {this.props.router.asPath.indexOf("?token=") !== -1 ? (
                <ClientLoader title={"Fetching Your Account Details…"} />
              ) : (
                <Component {...pageProps} />
              )}
              {!navConfig.isMinimal && <Footer />}
              <ModalOverlay />
            </>
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}

export default withReduxStore(withRouter(AnalogCafeApp));
