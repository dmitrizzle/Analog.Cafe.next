import Head from "next/head";
import React from "react";

import { NAME } from "../../../../constants/messages/system";

const Main = props => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>{props.children}</main>
  </>
);

export default Main;
