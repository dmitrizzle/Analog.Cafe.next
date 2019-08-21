import React from "react";
import styled, { css } from "styled-components";

import {
  b_mobile,
  b_movie,
  b_phablet,
  m_radius,
  m_radius_sm,
} from "../../../../constants/styles/measurements";
import {
  c_black,
  c_grey_med,
  c_red,
  c_white,
} from "../../../../constants/styles/colors";
import { paragraph, title } from "../../../../constants/styles/typography";

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
  background: ${c_white};
  background: ${props => (props.inverse ? c_black : null)}
    ${props => (props.branded ? c_red : null)};

  color: ${() => c_black} !important;
  color: ${props => (props.inverse ? c_white : null)}
    ${props => (props.branded ? c_white : null)} !important;

    stroke: ${props => (!props.inverse && !props.branded ? c_black : null)};
  }
  border-radius: ${m_radius_sm};
  padding: 0.8em 0px;
  margin: 1em auto;
  cursor: pointer;
  user-select: none;

  box-shadow: 0 0 0 1px ${props => {
    if (props.branded) return c_red;
    if (props.inverse) return c_black;
    return c_grey_med;
  }};

  ${
    "" /* loader will need to be black/foreground in colour (it defaults to white) */
  }
  ${props => {
    if (props.branded) return "";
    if (props.inverse) return "";
    return css`
      svg {
        path {
          stroke: ${c_black};
        }
      }
    `;
  }};

  &:active, &:focus, &.active  {
    background: ${c_black} !important;
    box-shadow: 0 0 ${c_black} inset;
    color: ${c_white} !important;
  }

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

export const TinyButton = styled(props => <LinkButton {...props} />)`
  padding: 0.2em 0.5em;
  width: 8em;
  border-radius: calc(${m_radius} / 2);
  ${props =>
    props.followComposerCursor &&
    `
      margin-top: 2px;
      position: absolute;
      z-index: 9;
      right: -1.5em;

      @media (max-width: ${b_phablet}) {
        right: 0;
      }
      @media (max-width: ${b_mobile}) {
        right: -1em;
      }
  `}
`;

export const ButtonStrip = styled.div`
  & > div {
    display: flex;
    margin: 0;
  }
  width: 10em;
`;

export const Item = styled(TinyButton)`
  margin: 0;
  border-top-left-radius: ${props =>
    props.left ? `calc(${m_radius} / 2)` : 0};
  border-bottom-left-radius: ${props =>
    props.left ? `calc(${m_radius} / 2)` : 0};
  border-top-right-radius: ${props =>
    props.right ? `calc(${m_radius} / 2)` : 0};
  border-bottom-right-radius: ${props =>
    props.right ? `calc(${m_radius} / 2)` : 0};
  ${props => (props.script ? paragraph : null)};
`;
