import React from "react";
import toTitleCase from "titlecase";

import HeaderSubtitle from "./components/HeaderSubtitle";
import HeaderTitle from "./components/HeaderTitle";
import HeaderWrapper from "./components/HeaderWrapper";
import Link from "../../controls/Link";

export default props => {
  return (
    <HeaderWrapper {...props}>
      <HeaderTitle title={props.title}>
        {props.noTitleCase ? props.pageTitle : toTitleCase(props.pageTitle)}
      </HeaderTitle>

      {props.pageSubtitle && (
        <HeaderSubtitle>
          {props.noTitleCase
            ? props.pageSubtitle
            : toTitleCase(props.pageSubtitle)}
        </HeaderSubtitle>
      )}
      {props.children}
    </HeaderWrapper>
  );
};
