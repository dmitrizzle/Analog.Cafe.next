import React from "react";
import styled, { css } from "styled-components";

import { c_red } from "../../../../constants/styles/themes";

const Heart = props => (
  <svg
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 50"
  >
    <path d="M40 0c-4.785 0-9.068 2.112-12 5.441C25.068 2.112 20.785 0 16 0 7.163 0 0 7.163 0 16c0 18 22 28 28 34 6-6 28-16 28-34 0-8.837-7.163-16-16-16z" />
  </svg>
);

export const HeartInlineWrapper = styled.span`
  svg {
    display: inline-block;
    margin: -0.5em 0 0 0.33em;
    height: 1em;
    path {
      ${props =>
        props.branded &&
        css`
          fill: ${c_red};
          stroke: ${c_red} !important;
        `}
    }
  }
`;
export const HeartInline = props => (
  <HeartInlineWrapper {...props}>
    <Heart {...props} />
  </HeartInlineWrapper>
);
export default Heart;
