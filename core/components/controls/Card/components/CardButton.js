import React from "react";
import styled, { css, keyframes } from "styled-components";

import {
  b_mobile,
  b_phablet,
} from "../../../../../constants/styles/measurements";
import LinkButton from "../../Button/components/LinkButton";

export const styles = css`
  max-width: 100%;
  margin: 0;
  border-radius: 0;
  &:active {
    ${({ noDownstate, theme }) =>
      !noDownstate && `box-shadow: 0 -1px 0 ${theme.fg}`};
    ${({ noDownstate, theme }) =>
      noDownstate && `background: ${theme.grey_med} !important`};
  }
  @media (max-width: ${b_mobile}) {
    ${({ mobile }) => mobile === "off" && `display: none;`}
  }
  @media (min-width: ${b_phablet}) {
    ${({ mobile }) => mobile === "on" && `display: none;`}
  }
`;

const animationUnfold = keyframes`
  from { padding: 0;   }
  to { padding: 0.8em 0;   }
`;

const CardButton = styled(props => {
  return <LinkButton {...props} className="card-button" />;
})`
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
export default CardButton;
