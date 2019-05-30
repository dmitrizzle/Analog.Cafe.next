import React from "react";
import styled, { css } from "styled-components";

import { c_red, c_white } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

export const navLinkStyles = css`
  ${title}

  &.active,
  &:active,
  &:focus {
    background: ${c_red};
    color: ${c_white};
    div > div {
    }
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
