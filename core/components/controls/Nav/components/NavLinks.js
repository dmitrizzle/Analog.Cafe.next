import React from "react";
import styled, { css } from "styled-components";

import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

const activeLink = css`
  background: ${({ theme }) => theme.brand} !important;
  color: ${({ theme }) => theme.bg} !important;
  ${({ blue, red, theme }) =>
    (blue || red) &&
    css`
      background: ${blue ? theme.blue : theme.brand} !important;
    `}
`;
export const navLinkStyles = css`
  ${title}

  background: ${({ theme, opaque }) =>
    opaque ? theme.bg : "transparent"} !important;
  ${({ blue, theme }) =>
    blue &&
    css`
      background: ${theme.blue} !important;
      color: ${theme.bg} !important;
    `};
  ${({ theme, red }) =>
    red &&
    css`
      background: ${theme.brand} !important;
      color: ${theme.bg} !important;
    `};
  ${({ black, theme }) =>
    black &&
    css`
      background: ${theme.fg} !important;
      color: ${theme.bg} !important;
    `};

  ${({ blue, disabled, theme }) =>
    disabled &&
    css`
      background: ${theme.bg} !important;
      color: ${blue ? theme.blue : theme.grey_med} !important;
    `};

  &.active,
  &:active,
  &:focus {
    ${activeLink}
  }

  .touch & {
    &:hover {
      ${activeLink}
    }
  }

  ${props => (props.connectionStatus === "offline" ? `opacity: .5` : null)};
`;
// eslint-disable-next-line
const StyledLink = styled(({ blue, black, red, ...props }) => (
  <Link {...props} />
))`
  ${navLinkStyles}
`;
export const NavLink = props => {
  // eslint-disable-next-line
  const { special, ...other } = props;
  return <StyledLink activeClassName="active" {...other} />;
};
