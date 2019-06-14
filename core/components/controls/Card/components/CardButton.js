import React from "react";
import styled, { css, keyframes } from "styled-components";

import {
  b_mobile,
  b_tablet,
} from "../../../../../constants/styles/measurements";
import { c_black, c_grey_med } from "../../../../../constants/styles/colors";
import LinkButton from "../../Button/components/LinkButton";

export const styles = css`
  max-width: 100%;
  margin: 0;
  border-radius: 0;
  &:active {
    ${props => !props.noDownstate && `box-shadow: 0 -1px 0 ${c_black}`};
    ${props => props.noDownstate && `background: ${c_grey_med} !important`};
  }
  @media (max-width: ${b_mobile}) {
    ${props => props.mobile === "off" && `display: none;`}
  }
  @media (min-width: ${b_tablet}) {
    ${props => props.mobile === "on" && `display: none;`}
  }
`;

const animationUnfold = keyframes`
  from { padding: 0;   }
  to { padding: 0.8em 0;   }
`;

export default styled(LinkButton)`
  ${styles};
  ${props =>
    props.animationUnfold &&
    css`
      overflow: hidden;
      animation-fill-mode: forwards;
      animation-delay: 100ms;
      animation: ${animationUnfold} 250ms;
    `};
`;
