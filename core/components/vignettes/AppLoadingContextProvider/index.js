import { useSelector } from "react-redux";
import React, { createContext, useState, useEffect } from "react";
import Router, { withRouter } from "next/router";

import { withRedux } from "../../../../utils/with-redux";

export const AppLoadingContext = createContext();
export const AppLoadingContextProvider = props => {
  const [isRouteLoading, setRouteLoading] = useState(false);
  const [isModalLoading, setModalLoading] = useState(false);

  const modal = useSelector(state => state.modal);

  useEffect(() => {
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

  return (
    <AppLoadingContext.Provider value={{ isRouteLoading, isModalLoading }}>
      {props.children}
    </AppLoadingContext.Provider>
  );
};

export default withRedux(withRouter(AppLoadingContextProvider));
