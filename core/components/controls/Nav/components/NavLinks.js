import React from "react";
import styled, { css } from "styled-components";

import { c_blue, c_red } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

const activeLink = css`
  background: ${c_red} !important;
  color: ${({ theme }) => theme.bg} !important;
  ${props =>
    (props.blue || props.red) &&
    css`
      background: ${props.blue ? c_blue : c_red} !important;
    `}
`;
export const navLinkStyles = css`
  ${title}

  ${props =>
    props.blue &&
    css`
      background: ${c_blue} !important;
      color: ${({ theme }) => theme.bg} !important;
    `}
    ${props =>
      props.red &&
      css`
        background: ${c_red} !important;
        color: ${({ theme }) => theme.bg} !important;
      `}
      ${props =>
        props.black &&
        css`
          background: ${({ theme }) => theme.fg} !important;
          color: ${({ theme }) => theme.bg} !important;
        `}

      ${({ blue, disabled, theme }) =>
        disabled &&
        css`
          background: ${({ theme }) => theme.bg} !important;
          color: ${blue ? c_blue : theme.grey_med} !important;
        `}

  &.active,
  &:active,
  &:focus { ${activeLink} }

  .touch & { &:hover { ${activeLink} } }

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
