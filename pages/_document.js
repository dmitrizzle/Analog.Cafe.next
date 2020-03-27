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
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        <link rel="manifest" href="/static/manifest.json" />

        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/static/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/static/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/apple-touch-icon-180x180.png"
        />
        <link
          rel="apple-touch-icon"
          href="/static/apple-touch-icon-1024x1024.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/static/icon-120x120.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="whtie" />

        <link rel="preconnect" href="https://storage.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default AnalogCafeDocument;
