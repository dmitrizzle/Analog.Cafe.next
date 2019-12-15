import React, { useState, useEffect } from "react";
import toTitleCase from "titlecase";
import Router from "next/router";

import HeaderSubtitle from "./components/HeaderSubtitle";
import HeaderTitle from "./components/HeaderTitle";
import HeaderWrapper from "./components/HeaderWrapper";

const HeaderLarge = props => {
  const [isLoading, setLoadingState] = useState(true);
  const isCancelled = React.useRef(false);
  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  Router.events.on("routeChangeStart", () => {
    if (!isCancelled.current) setLoadingState(true);
  });
  Router.events.on("routeChangeComplete", () => {
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

export default HeaderLarge;
