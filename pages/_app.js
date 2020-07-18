import "typeface-exo-2";
import "typeface-lora";

import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "styled-components";
import { withRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import { CssBody } from "../constants/styles/global";
import { DOMAIN } from "../constants/router/defaults";
import { NAME } from "../constants/messages/system";
import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { analytics } from "../utils/data/ga";
import { dark, light } from "../constants/styles/themes";
import Nav from "../core/components/controls/Nav";

const AppLoader = dynamic(
  () => import("../core/components/layouts/Main/components/AppLoader"),
  {
    ssr: false,
  }
);

const AnalogCafeApp = props => {
  useEffect(() => {
    // this helps with managing :active pseudoclass on iOS
    document.body.addEventListener("touchstart", function() {}, false);

    // start Google Analytics tracker
    analytics(props.router.asPath);

    // touch id styles
    "ontouchstart" in document.documentElement
      ? document.body.classList.add("touch")
      : document.body.classList.add("no-touch");

    // conditionally load smooth scroll polyfillDelay
    if ("scrollBehavior" in document.documentElement.style) return;
    import("smoothscroll-polyfill").then(smoothscroll => {
      smoothscroll.polyfill();
    });
  });

  const { Component, pageProps, router } = props;

  const seo = {
    title: TEXT_EMOJIS.MONOCLE,
    titleTemplate: "%s — " + NAME,
    canonical:
      DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION + router.asPath ||
      router.path,
  };

  return (
    <>
      <ThemeProvider theme={dark}>
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
          <Nav />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    </>
  );
};

export default withRouter(AnalogCafeApp);
