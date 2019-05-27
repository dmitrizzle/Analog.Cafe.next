import React from "react";
import styled, { css, keyframes } from "styled-components";

import { c_red, c_white } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

const activeCss = css`
  background: ${c_red};
  color: ${c_white};
`;

const animation = keyframes`
0% {}
1% {
  background: ${c_red};
  color: ${c_white};
}
100% {}
`;
const StyledLink = styled(Link)`
  ${title}
  &.active, &:active {
    ${activeCss};
  }
  &:focus {
    ${activeCss};
    div > div {
      ${activeCss};
    }
  }
  ${props => (props.connectionStatus === "offline" ? `opacity: .5` : null)};
`;
export const NavLink = props => {
  var { special, ...other } = props;
  return <StyledLink activeClassName="active" {...other} />;
};
