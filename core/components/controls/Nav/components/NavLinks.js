import React from "react";
import styled, { css } from "styled-components";

import {
  c_black,
  c_blue,
  c_grey_light,
  c_red,
  c_white,
} from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

export const navLinkStyles = css`
  ${title}

  ${props =>
    props.blue &&
    css`
      background: ${c_blue} !important;
      color: ${c_white} !important;
    `}
    ${props =>
      props.red &&
      css`
        background: ${c_red} !important;
        color: ${c_white} !important;
      `}
  &.active,
  &:active,
  &:focus {
    background: ${c_red} !important;
    color: ${c_white} !important;
    ${props =>
      (props.blue || props.red) &&
      css`
        background: ${c_grey_light} !important;
        color: ${c_black} !important;
      `}
  }
  ${props => (props.connectionStatus === "offline" ? `opacity: .5` : null)};
`;
const StyledLink = styled(Link)`
  ${navLinkStyles}
`;
export const NavLink = props => {
  var { special, ...other } = props;
  return <StyledLink activeClassName="active" {...other} />;
};
