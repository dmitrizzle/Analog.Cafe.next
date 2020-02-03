import "typeface-exo-2";
import "typeface-lora";

import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "styled-components";
import { withRouter } from "next/router";
import React, { useEffect } from "react";

import { CssBody } from "../constants/styles/global";
import { DOMAIN } from "../constants/router/defaults";
import { NAME } from "../constants/messages/system";
import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { analytics } from "../utils/data/ga";
import { c_red } from "../constants/styles/colors";
import { mapPathnameToNavConfig } from "../core/components/layouts/Main/utils";
import AppLoader from "../core/components/layouts/Main/components/AppLoader";
import Nav from "../core/components/controls/Nav";

const AnalogCafeApp = props => {
  useEffect(() => {
    // this helps with managing :active pseudoclass on iOS
    document.body.addEventListener("touchstart", function() {}, false);

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
  });

  const navConfig = mapPathnameToNavConfig(props.router.pathname, status);

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
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    </>
  );
};

export default withRouter(AnalogCafeApp);
