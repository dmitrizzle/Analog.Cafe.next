import { css } from "styled-components";
import React from "react";

import HeaderSmall from "../../../vignettes/HeaderSmall";

const CardHeader = props => <HeaderSmall title={props.error && props.error} noStar={props.noStar}>
  <h3
    title={typeof props.title === "string" ? props.title : undefined}
    onClick={event => event.stopPropagation()}
    style={{ fontSize: "1em", paddingTop: ".25em" }}
  >
    {props.titlePrefix && (
      <span
        css={css`
          color: ${({ theme }) => theme.brand};
        `}
      >
        {props.titlePrefix}
      </span>
    )}
    {props.title}
  </h3>
  {!(
    props.stubborn &&
    props.buttons &&
    Object.keys(props.buttons).length > 0
  ) ? (
    <a
      data-cy="CardHeaderClose"
      href="#close"
      onClick={event => event.preventDefault()}
    >
      ✕
    </a>
  ) : (
    (props.buttons && props.buttons[0]) || null
  )}
</HeaderSmall>;

export default CardHeader;
