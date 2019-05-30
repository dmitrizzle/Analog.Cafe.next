import React from "react";
import styled, { css } from "styled-components";

import {
  c_black,
  c_red,
  c_white
} from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

const activeCss = css`
  background: ${c_red};
  color: ${c_white};
`;

export const navLinkStyles = css`
  ${title}
  transition: background 50ms;
  &:focus {
    ${activeCss};
    div > div {
      ${activeCss};
    }
  }
  &.active,
  &:active {
    ${activeCss};
    animation: none;
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
