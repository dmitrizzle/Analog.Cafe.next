import React from "react";
import styled, { css } from "styled-components";

import {
  b_mobile,
  b_movie,
  m_radius_sm,
} from "../../../../constants/styles/measurements";
import { c_red } from "../../../../constants/styles/colors";
import { title } from "../../../../constants/styles/typography";

//
const activeButton = css`
  background: ${({ theme }) => theme.fg} !important;
  box-shadow: 0 0 ${({ theme }) => theme.fg} inset;
  color: ${({ theme }) => theme.bg} !important;
`;
export const ButtonStyles = css`
  max-width: ${b_mobile};
  @media (min-width: ${b_movie}) {
    max-width: 380px;
  }
  ${title}
  margin: 0 auto;
  text-decoration: none;
  text-align: center;
  display: block;
  background: ${({ theme }) => theme.bg};
  background: ${({ theme, inverse }) => (inverse ? theme.fg : null)}
    ${({ branded }) => (branded ? c_red : null)};

  color: ${({ inverse, branded, theme }) =>
    inverse || branded ? theme.bg : theme.fg} !important;


    stroke: ${({ inverse, branded, theme }) =>
      !inverse && !branded ? theme.fg : null};
  }
  border-radius: ${m_radius_sm};
  padding: 0.8em 0px;
  margin: 1em auto;
  cursor: pointer;
  user-select: none;

  box-shadow: 0 0 0 1px ${({ inverse, branded, theme }) => {
    if (branded) return c_red;
    if (inverse) return theme.fg;
    return theme.grey_med;
  }};

  ${
    "" /* loader will need to be black/foreground in colour (it defaults to white) */
  }
  ${({ inverse, branded, theme }) => {
    if (branded || inverse) return "";
    return css`
      svg {
        path {
          stroke: ${theme.fg};
        }
      }
    `;
  }};

  &:active, &:focus, &.active  {
    ${activeButton}
  }
  .touch & { &:not(.card-button):hover { ${activeButton} } }

  @media (max-width: ${b_mobile}) {
    max-width: 100vw;
    border-radius: 0;
    section & {
        width: 100vw;
          margin-left: -1.5em;
          margin-right: -1.5em;
    }
  }
`;

export const LinkButton = styled(props => {
  const {
    linkComponent,
    /* eslint-disable-next-line */
    branded,
    /* eslint-disable-next-line */
    inverse,
    /* eslint-disable-next-line */
    animationUnfold,
    ...validProps
  } = props;
  const Link = linkComponent;
  return <Link {...validProps} />;
})`
  ${ButtonStyles};
`;

export default styled(props => (
  <button
    className={props.className}
    style={props.style}
    onClick={props.onClick}
    disabled={props.loading}
  >
    {props.children}
  </button>
))`
  box-sizing: content-box;
  background: inherit;
  border-width: 0;
  color: inherit;
  user-select: none;
  margin: inherit;
  width: 100%;
  outline: transparent;
  &:-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  ${ButtonStyles};
`;
