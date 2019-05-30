import "typeface-exo-2";
import "typeface-lora";

import { Reset as CssReset } from "styled-reset";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App, { Container } from "next/app";
import React from "react";

import { CssBody } from "../constants/styles/global";
import AppLoader from "../core/components/layouts/Main/components/AppLoader";
import ModalOverlay from "../core/components/controls/Modal/components/ModalOverlay";
import withReduxStore from "../utils/with-redux-store";

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
  };
  componentWillUnmount() {
    this._ismounted = false;
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <ThemeProvider theme={{}}>
            <>
              <CssReset />
              <CssBody />
              <AppLoader />
              <Component {...pageProps} />
              <ModalOverlay />
            </>
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(AnalogCafeApp);
