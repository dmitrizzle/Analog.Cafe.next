import Head from "next/head";
import React from "react";

import { APP } from "../../../../constants/messages";

const Main = props => (
  <>
    <Head>
      <title>{APP.NAME}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>{props.children}</main>
  </>
);

export default Main;
