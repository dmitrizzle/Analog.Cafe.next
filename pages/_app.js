import "typeface-exo-2";
import "typeface-lora";

import { DefaultSeo } from "next-seo";
import { withRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import { CssBody } from "../constants/styles/global";
import { DOMAIN } from "../constants/router/defaults";
import { NAME } from "../constants/messages/system";
import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { analytics } from "../utils/data/ga";
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

    // start Google Analytics tracker
    analytics(props.router.asPath);

    // start FullStory tracker
    // fullStory();

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
          <AppLoader />
          <Notifications />
          <Nav />
          <Component {...pageProps} />
        </>
      </Theme>
    </>
  );
};

export default withRouter(AnalogCafeApp);
