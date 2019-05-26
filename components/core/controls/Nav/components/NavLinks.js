import React from "react";
import styled, { css } from "styled-components";

import { c_red, c_white } from "../../../../../constants/styles/colors";
import Link from "../../Link";

// NOTE: these CSS properties are rendered in index.html as critical path CSS
// <StyledLink />
// background: ${props => props.theme.color.background()};
// text-decoration: none;
// position: relative;

export const navActiveCss = css`
  background-color: ${c_red} !important;
  color: ${c_white} !important;
`;

const StyledLink = styled(Link)`
  &.active,
  &:active {
    ${navActiveCss};
  }
  ${props => (props.connectionStatus === "offline" ? `opacity: .5` : null)};
`;
export const NavLink = props => {
  var { special, ...other } = props;
  return <StyledLink {...other} />;
};
export const NavLogoLink = props => {
  return <Link {...props} />;
};
