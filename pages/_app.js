import "typeface-exo-2";
import "typeface-lora";

import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "styled-components";
import { withRouter } from "next/router";
import React, { useEffect } from "react";

import { CssBody } from "../constants/styles/global";
import { DOMAIN } from "../constants/router/defaults";
import { NAME } from "../constants/messages/system";
import { NAV_MIN_MAP } from "../constants/router/breadcrumbs";
import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { analytics } from "../utils/data/ga";
import { c_red } from "../constants/styles/colors";
// import AppLoader from "../core/components/layouts/Main/components/AppLoader";
import ClientLoader from "../core/components/layouts/Main/components/ClientLoader";
import Footer from "../core/components/layouts/Main/components/Footer";
import ModalOverlay from "../core/components/controls/Modal/components/ModalOverlay";
// import Nav from "../core/components/controls/Nav";

// nav rules and exceptions

const AnalogCafeApp = props => {
  useEffect(() => {
    // this helps with managing :active pseudoclass on iOS
    document.body.addEventListener("touchstart", function() {}, false);

    // if (this.props.router.query.collection)
    // history.scrollRestoration = "manual";

    // write login token
    // const urlParamsJson = getJsonFromUrl(window.location.search);
    // if (urlParamsJson && urlParamsJson.token) {
    //   localStorage.setItem("token", urlParamsJson.token);
    // }

    // fetch user info
    // if (localStorage.getItem("token")) props.reduxStore.dispatch(getUserInfo());

    // configure nav on client
    // const mapPathnameToNavConfigClient = pathname => {
    //   if (pathname === "/account" && localStorage.getItem("token")) {
    //     return navConfigDefault;
    //   }
    // };
    // this.forceUpdate(); // required to apply client nav config

    // data
    // if (localStorage.getItem("fullstory-enabled") !== "false") {
    //   import("../utils/data/fullstory").then(FullStory => {
    //     FullStory.default();
    //   });
    // }

    // start Google Analytics tracker
    analytics(props.router.asPath);

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
    // if (props.router.asPath.indexOf("?token=") !== -1) {
    //   Router.push("/account");
    //   return;
    // }
  });

  const { Component, pageProps, router } = props;

  let deepRoute = router.pathname;
  if (pageProps && pageProps.error) deepRoute = "/_error";

  // const navConfig =
  //   (typeof mapPathnameToNavConfigClient !== "undefined" &&
  //     mapPathnameToNavConfigClient(deepRoute)) ||
  //   mapPathnameToNavConfig(deepRoute);

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
      <ThemeProvider
        theme={{
          accent: c_red,
        }}
      >
        <>
          <CssBody />

          {props.router.asPath.indexOf("?token=") !== -1 ? (
            <ClientLoader title={"Fetching Your Account Details…"} />
          ) : (
            <Component {...pageProps} />
          )}
          {/*!navConfig.isMinimal && <Footer />*/}
        </>
      </ThemeProvider>
    </>
  );
};

export default withRouter(AnalogCafeApp);
