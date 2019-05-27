import { Reset as CssReset } from "styled-reset";
import { ThemeProvider } from "styled-components";
import App, { Container } from "next/app";
import React from "react";

import "typeface-exo-2";
import "typeface-lora";

import { CssBody } from "../constants/styles/global";

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
        <ThemeProvider theme={{}}>
          <>
            <CssReset />
            <CssBody />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </Container>
    );
  }
}

export default AnalogCafeApp;
