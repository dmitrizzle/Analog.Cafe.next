import React from "react";
import styled, { css, keyframes } from "styled-components";

import {
  b_mobile,
  b_tablet
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
  from {
    padding: 0;
  }
  to {
    padding: 0.8em 0;
  }
`;

export default styled(({ noDownstate, animationUnfold, ...props }) => {
  return <LinkButton {...props} />;
})`
  ${styles};
  ${props =>
    props.animationUnfold &&
    `
      overflow: hidden;
      animation-fill-mode: forwards;
      animation-delay: 100ms;
      animation: ${animationUnfold} 250ms;
  `};
`;

export const searchTextStyles = css`
  text-align: left;
  position: relative;
  padding: 0 0 0.5em;
  color: ${c_black};
`;

export const CardSearchItem = styled(LinkButton)`
  ${styles};
  padding: 1em 2em;
  position: relative;
  text-align: left;
  div {
    font-size: 0.85em;
    ${searchTextStyles};
  }
  em {
    font-family: Lora, serif;
    font-size: 0.65em;
    font-weight: 400;
    ${searchTextStyles};
    display: inline-block;
    text-align: left;
  }
  ::after {
    content: "";
    position: absolute;
    width: 3em;
    height: 3em;
    bottom: -1px;
    right: -1px;

    ${props =>
      props.image &&
      `
      background: url(${props.image});
      background-size: cover;
      clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    `};
  }
  :active {
    background: ${c_black} !important;
  }
`;
