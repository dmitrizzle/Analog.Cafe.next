import React, { useState, useEffect } from "react";
import toTitleCase from "titlecase";
import { withRouter } from "next/router";

import HeaderSubtitle from "./components/HeaderSubtitle";
import HeaderTitle from "./components/HeaderTitle";
import HeaderWrapper from "./components/HeaderWrapper";

const HeaderLarge = props => {
  const [isLoading, setLoadingState] = useState(false);
  const routerEvents = props.router.events;

  const isCancelled = React.useRef(false);
  React.useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  routerEvents.on("routeChangeStart", () => {
    if (!isCancelled.current) setLoadingState(true);
  });
  routerEvents.on("routeChangeComplete", () => {
    if (!isCancelled.current) setLoadingState(false);
  });

  return (
    <HeaderWrapper {...props}>
      <HeaderTitle title={props.title} isLoading={isLoading}>
        {props.noTitleCase ? props.pageTitle : toTitleCase(props.pageTitle)}
      </HeaderTitle>

      {props.pageSubtitle && (
        <HeaderSubtitle isLoading={isLoading}>
          {props.noTitleCase
            ? props.pageSubtitle
            : toTitleCase(props.pageSubtitle)}
        </HeaderSubtitle>
      )}
      {props.children}
    </HeaderWrapper>
  );
};

export default withRouter(HeaderLarge);
