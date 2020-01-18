import { useSelector, shallowEqual } from "react-redux";
import React, { useState, useEffect } from "react";
import Router, { withRouter } from "next/router";

import { AnimatedProgress } from "./AppStatusWrapper";

const AppLoader = props => {
  const [isRouteLoading, setRouteLoading] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);

  const { modal } = useSelector(
    state => ({
      modal: state.modal,
    }),
    shallowEqual
  );

  useEffect(() => {
    // transmit router loading events on route change
    Router.events.on("routeChangeStart", () => setRouteLoading(true));
    Router.events.on("routeChangeComplete", () => setRouteLoading(false));
    Router.events.on("routeChangeError", () => setRouteLoading(false));

    // transmit router loading events on modal recall
    setModalLoading(modal.status === "loading");
  }, [isRouteLoading, modal.status]);

  return <AnimatedProgress isLoading={isRouteLoading || isModalLoading} />;
};

export default withRouter(AppLoader);
