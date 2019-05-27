import React from "react";
import styled, { css } from "styled-components";

import { c_red, c_white } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

export const navActiveCss = css`
  background-color: ${c_red} !important;
  color: ${c_white} !important;
`;

const StyledLink = styled(Link)`
  ${title}
  &.active,
  &:active {
    ${navActiveCss};
  }
  ${props => (props.connectionStatus === "offline" ? `opacity: .5` : null)};
`;
export const NavLink = props => {
  var { special, ...other } = props;
  return <StyledLink activeClassName="active" {...other} />;
};
export const NavLogoLink = props => {
  return <Link activeClassName="active" {...props} />;
};
