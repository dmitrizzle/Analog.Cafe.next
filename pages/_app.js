import "typeface-exo-2";
import "typeface-lora";

import { DefaultSeo } from "next-seo";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { withRouter } from "next/router";
import App, { Container } from "next/app";
import React from "react";

import { CssBody } from "../constants/styles/global";
import { DOMAIN } from "../constants/router/defaults";
import { NAME } from "../constants/messages/system";
import { TEXT_EMOJIS } from "../constants/messages/emojis";
import { c_red } from "../constants/styles/colors";
import { getJsonFromUrl } from "../utils/url";
import { getUserInfo } from "../user/store/actions-user";
import AppLoader from "../core/components/layouts/Main/components/AppLoader";
import Footer from "../core/components/layouts/Main/components/Footer";
import ModalOverlay from "../core/components/controls/Modal/components/ModalOverlay";
import Nav from "../core/components/controls/Nav";
import Notification from "../core/components/layouts/Main/components/Notification";
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
  if (pathname === "/account") return navConfigMinimal;
  if (pathname === "/") return navConfigList;
  if (pathname.includes("/nav/")) return navConfigMinimal;
  if (pathname.includes("/_error")) return navConfigMinimal;
  if (pathname.includes("/submit/draft")) return navConfigMinimal;
  if (pathname.includes("/submit/upload")) return navConfigHidden;
  if (pathname.includes("/account/all-submissions")) return navConfigList;
  if (pathname.includes("/account/profile")) return navConfigMinimal;
  return navConfigDefault;
};

class AnalogCafeApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  componentDidMount = () => {
    // this helps with managing :active pseudoclass on iOS
    document.body.addEventListener("touchstart", function() {}, false);
    history.scrollRestoration = "manual";

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
    //
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
      <Container>
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
                openGraph={{
                  type: "website",
                  images: [
                    {
                      url:
                        DOMAIN.PROTOCOL.PRODUCTION +
                        DOMAIN.APP.PRODUCTION +
                        "/static/poster.a1d0c6e83f027327d8461063f4ac58a6.jpg",
                    },
                  ],
                }}
                twitter={{
                  site: "@analog_cafe",
                  cardType: "summary_large_image",
                }}
              />

              <CssBody />
              <Notification />
              <AppLoader />
              <Nav {...navConfig} />
              <Component {...pageProps} />
              {!navConfig.isMinimal && <Footer />}
              <ModalOverlay />
            </>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(withRouter(AnalogCafeApp));
