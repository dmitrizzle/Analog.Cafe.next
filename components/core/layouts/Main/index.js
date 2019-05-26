import Head from "next/head";
import React from "react";

import { APP } from "../../../../constants/messages";
import Nav from "../../controls/Nav";

const Main = props => (
  <>
    <Head>
      <title>{APP.NAME}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Nav />
    <main>{props.children}</main>
  </>
);

export default Main;
