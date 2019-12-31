import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import React, { useState, useEffect } from "react";

import { AnimatedProgress } from "./AppStatusWrapper";

const AppLoader = props => {
  const [isRouteLoading, setRouteLoading] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    // transmit router loading events on route change
    Router.events.on("routeChangeStart", () => setRouteLoading(true));
    Router.events.on("routeChangeComplete", () => setRouteLoading(false));
    Router.events.on("routeChangeError", () => setRouteLoading(false));

    // transmit router loading events on modal recall
    setModalLoading(props.modal.status === "loading");
  }, [isRouteLoading, props.modal.status]);

  return <AnimatedProgress isLoading={isRouteLoading || isModalLoading} />;
};

export default connect(({ modal }) => {
  return { modal };
}, null)(withRouter(AppLoader));
