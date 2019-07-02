import React from "react";

import { c_red } from "../../../../../constants/styles/colors";
import HeaderSmall from "../../../vignettes/HeaderSmall";

export default props => (
  <HeaderSmall title={props.error && props.error} noStar={props.noStar}>
    <h3
      title={typeof props.title === "string" ? props.title : undefined}
      onClick={event => event.stopPropagation()}
      style={{ fontSize: "1em", paddingTop: ".25em" }}
    >
      {props.titlePrefix && (
        <span style={{ color: c_red }}>{props.titlePrefix}</span>
      )}
      {props.title}
    </h3>
    {!(
      props.stubborn &&
      props.buttons &&
      Object.keys(props.buttons).length > 0
    ) ? (
      <a href="#close" onClick={event => event.preventDefault()}>
        ✕
      </a>
    ) : (
      (props.buttons && props.buttons[0]) || null
    )}
  </HeaderSmall>
);
