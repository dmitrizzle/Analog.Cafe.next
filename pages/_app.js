import { Reset } from "styled-reset";
import App, { Container } from "next/app";
import React from "react";

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
        <Reset />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default AnalogCafeApp;
