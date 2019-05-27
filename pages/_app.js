import "typeface-exo-2";
import "typeface-lora";

import { Reset as CssReset } from "styled-reset";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import App, { Container } from "next/app";
import React from "react";

import { CssBody } from "../constants/styles/global";
import ModalOverlay from "../core/components/controls/Modal/components/ModalOverlay";
import store from "../store";
import withReduxStore from "../utils/with-redux-store";

class AnalogCafeApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Provider store={this.props.reduxStore}>
          <ThemeProvider theme={{}}>
            <>
              <CssReset />
              <CssBody />
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
