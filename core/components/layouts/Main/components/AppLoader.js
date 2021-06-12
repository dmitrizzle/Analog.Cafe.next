import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useState, useEffect } from "react";
import lscache from "lscache";
import throttle from "lodash.throttle";

import { AnimatedProgress } from "./AppStatusWrapper";
import { AppLoadingContext } from "../../../vignettes/AppLoadingContextProvider";
import { getUserInfo } from "../../../../../user/store/actions-user";
import { withRedux } from "../../../../../utils/with-redux";

const AppLoader = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // clear cache storage
    lscache.flushExpired();

    // initialize user session
    const token = lscache.get("token");
    user.status === "pending" && token && dispatch(getUserInfo());
  }, []);

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

  const { isRouteLoading, isModalLoading } = useContext(AppLoadingContext);

  return (
    <AnimatedProgress
      isLoading={isRouteLoading || isModalLoading}
      hasBannerMessage={hasBannerMessage}
    />
  );
};

export default withRedux(AppLoader);
