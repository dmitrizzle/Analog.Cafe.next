import { ServerStyleSheet } from "styled-components";
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

import { c_charcoal } from "../constants/styles/themes";

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
        <meta charSet="utf-8" />\{" "}
        <link
          rel="shortcut icon"
          href="/static/favicon.ico"
          type="image/x-icon"
        />
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={c_charcoal} />
        <meta name="msapplication-TileColor" content={c_charcoal} />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/static/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/static/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/static/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/static/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/static/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/static/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/static/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/static/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/static/android-icon-36x36.png"
          sizes="36x36"
        />
        <link
          rel="icon"
          type="image/png"
          href="/static/android-icon-48x48.png"
          sizes="48x48"
        />
        <link
          rel="icon"
          type="image/png"
          href="/static/android-icon-72x72.png"
          sizes="72x72"
        />
        <link
          rel="icon"
          type="image/png"
          href="/static/android-icon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="/static/android-icon-144x144.png"
          sizes="144x144"
        />
        <link
          rel="icon"
          type="image/png"
          href="/static/android-icon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="/static/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="/static/favicon-16x16.png"
          sizes="16x16"
        />
        <meta
          name="msapplication-TileImage"
          content="/static/ms-icon-144x144.png"
        />
        <meta
          name="msapplication-square70x70logo"
          content="/static/ms-icon-70x70.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/static/ms-icon-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="/static/ms-icon-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/static/ms-icon-310x310.png"
        />
        <link
          href="/static/apple-startup-320x460.png"
          media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-640x920.png"
          media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-640x1096.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-748x1024.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: landscape)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-750x1024.png"
          media=""
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-750x1294.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-768x1004.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: portrait)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-1182x2208.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-1242x2148.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-1496x2048.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/static/apple-startup-1536x2008.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          rel="apple-touch-startup-image"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default AnalogCafeDocument;
