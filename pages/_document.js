import { ServerStyleSheet } from "styled-components";
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class AnalogCafeDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render = () => (
    <Html>
      <Head>
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        <link rel="manifest" href="/static/manifest.json" />
        <meta
          name="monetization"
          content="$coil.xrptipbot.com/wEVX_hqQT7CgnsSxrISpzg"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default AnalogCafeDocument;
