import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Router, { withRouter } from "next/router";
import lscache from "lscache";

import { AnimatedProgress } from "./AppStatusWrapper";
import { getUserInfo } from "../../../../../user/store/actions-user";
import { withRedux } from "../../../../../utils/with-redux";

const AppLoader = () => {
  const [isRouteLoading, setRouteLoading] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);

  const modal = useSelector(state => state.modal);
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = lscache.get("token");
    user.status === "pending" && token && dispatch(getUserInfo());

    // transmit router loading events on route change
    let minLoadingTime;
    Router.events.on("routeChangeStart", () => {
      minLoadingTime = setTimeout(() => {
        clearTimeout(minLoadingTime);
        setRouteLoading(true);
      }, 300);
    });
    Router.events.on("routeChangeComplete", () => {
      clearTimeout(minLoadingTime);
      setRouteLoading(false);
    });
    Router.events.on("routeChangeError", () => {
      clearTimeout(minLoadingTime);
      setRouteLoading(false);
    });

    // transmit router loading events on modal recall
    setModalLoading(modal.status === "loading");
  }, [isRouteLoading, modal.status]);

  return <AnimatedProgress isLoading={isRouteLoading || isModalLoading} />;
};

export default withRedux(withRouter(AppLoader));
