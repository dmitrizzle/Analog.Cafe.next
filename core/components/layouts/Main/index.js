import { useSelector } from "react-redux";
import { withRouter } from "next/router";
import Head from "next/head";
import React from "react";

import { mapPathnameToNavConfig } from "./utils";
import { withRedux } from "../../../../utils/with-redux";
import BreadCrumbs from "../../controls/BreadCrumbs";
import Footer from "./components/Footer";
import ModalOverlay from "../../controls/Modal/components/ModalOverlay";

const Main = props => {
  const { router, query, filter, title } = props;

  const { status } = useSelector(state => state.user);
  const navConfig = mapPathnameToNavConfig(router.pathname, status);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {(query || filter) && (
        <BreadCrumbs query={query} filter={filter} title={title} />
      )}
      <main>{props.children}</main>
      {!navConfig.isMinimal &&
        !router.asPath.includes("/account/submission/") && <Footer />}
      <ModalOverlay />
    </>
  );
};

export default withRouter(withRedux(Main));
