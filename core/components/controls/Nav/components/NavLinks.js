import React from "react";
import styled, { css } from "styled-components";

import {
  c_blue,
  c_grey_med,
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

      ${props =>
        props.disabled &&
        css`
          background: ${c_white} !important;
          /* disabled blue and grey buttons */
          color: ${props.blue ? c_blue : c_grey_med} !important;
        `}

  &.active,
  &:active,
  &:focus {
    background: ${c_red} !important;
    color: ${c_white} !important;
    ${props =>
      (props.blue || props.red) &&
      css`
        background: ${props.blue ? c_blue : c_red} !important;
      `}
  }
  ${props => (props.connectionStatus === "offline" ? `opacity: .5` : null)};
`;
// eslint-disable-next-line
const StyledLink = styled(({ blue, ...props }) => <Link {...props} />)`
  ${navLinkStyles}
`;
export const NavLink = props => {
  // eslint-disable-next-line
  const { special, ...other } = props;
  return <StyledLink activeClassName="active" {...other} />;
};
