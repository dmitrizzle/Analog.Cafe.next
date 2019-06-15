import Head from "next/head";
import React from "react";

import { NAME } from "../../../../constants/messages/app";
import Footer from "./components/Footer";

const Main = props => (
  <>
    <Head>
      <title>{NAME}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>{props.children}</main>
  </>
);

export default Main;
