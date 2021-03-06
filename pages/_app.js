import "@fontsource/exo-2/600.css";
import "@fontsource/exo-2/variable.css";
import "@fontsource/lora/400-italic.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/700-italic.css";
import "@fontsource/lora/700.css";
import "@fontsource/lora/variable-italic.css";
import "@fontsource/lora/variable.css";

import { DefaultSeo } from "next-seo";
import { withRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import lscache from "lscache";

import { CssBody } from "../constants/styles/global";
import { DOMAIN } from "../constants/router/defaults";
import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { getObjectFromUrlParams, getObjectToUrlParams } from "../utils/url";
import AppLoadingContextProvider from "../core/components/vignettes/AppLoadingContextProvider";
import Nav from "../core/components/controls/Nav";
import Notifications from "../core/components/controls/Notifications";
import Theme from "../core/components/controls/Theme";

const AppLoader = dynamic(
  () => import("../core/components/layouts/Main/components/AppLoader"),
  {
    ssr: false,
  }
);

const AnalogCafeApp = props => {
  useEffect(() => {
    // this helps with managing :active pseudoclass on iOS
    document.body.addEventListener("touchstart", function () {}, false);

    // start FullStory tracker
    // fullStory();

    // start Google Analytics tracker
    (() => {
      if (lscache.get("privacy-tools")?.ga === false) return;
      import("../utils/data/ga/minimal-analytics-snippet");
    })();

    // touch id styles
    "ontouchstart" in document.documentElement
      ? document.body.classList.add("touch")
      : document.body.classList.add("no-touch");

    // conditionally load smooth scroll polyfillDelay
    if ("scrollBehavior" in document.documentElement.style) return;
    import("smoothscroll-polyfill").then(smoothscroll => {
      smoothscroll.polyfill();
    });
  }, []);

  const { Component, pageProps, router } = props;

  // only allow page?=x GET param in canonical urls
  const fullPath =
    DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION + router.asPath ||
    router.path;
  const query = getObjectFromUrlParams("?" + fullPath.split("?")[1]);
  const pageQuery = getObjectToUrlParams({
    page: query.page,
  });
  const canonical =
    fullPath.split("?")[0] + (query.page ? "?" + pageQuery : "");

  const seo = {
    title: TEXT_EMOJIS.MONOCLE,
    titleTemplate: "%s",
    canonical,
  };

  return (
    <>
      <Theme>
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
          <AppLoadingContextProvider>
            <AppLoader />
            <Notifications />
            <Nav />
            <Component {...pageProps} />
          </AppLoadingContextProvider>
        </>
      </Theme>
    </>
  );
};

export default withRouter(AnalogCafeApp);
