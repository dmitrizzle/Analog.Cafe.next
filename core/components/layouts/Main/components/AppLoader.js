import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Router, { withRouter } from "next/router";
import lscache from "lscache";
import throttle from "lodash.throttle";

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
    // clear cache storage
    lscache.flushExpired();

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

  const [hasBannerMessage, setHasBannerMessage] = useState(false);

  // scroll design transition
  useEffect(() => {
    const windowScrollHandlerNotifications = throttle(() => {
      if (
        document.documentElement.scrollTop <= 180 &&
        user.sessionInfo?.message?.active
      )
        return setHasBannerMessage(true);
      return setHasBannerMessage(false);
    }, 100);
    windowScrollHandlerNotifications();
    window.addEventListener("scroll", windowScrollHandlerNotifications, true);
    return () => {
      window.removeEventListener(
        "scroll",
        windowScrollHandlerNotifications,
        true
      );
    };
  }, [user.sessionInfo.message]);

  return (
    <AnimatedProgress
      isLoading={isRouteLoading || isModalLoading}
      hasBannerMessage={hasBannerMessage}
    />
  );
};

export default withRedux(withRouter(AppLoader));
