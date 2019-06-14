import Head from "next/head";
import React from "react";

import { NAME } from "../../../../constants/messages/app";
import Minimal from "../../controls/Nav/components/Minimal";

const Main = props => (
  <>
    <Head>
      <title>{NAME}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Minimal />
    <main>{props.children}</main>
  </>
);

export default Main;
