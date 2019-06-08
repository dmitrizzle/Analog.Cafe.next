import React from "react";
import styled, { css } from "styled-components";

import {
  b_mobile,
  b_phablet,
  m_radius,
  m_radius_sm,
} from "../../../../constants/styles/measurements";
import {
  c_black,
  c_black_a25,
  c_red,
  c_white,
} from "../../../../constants/styles/colors";
import { paragraph, title } from "../../../../constants/styles/typography";
import Link from "../Link";
import Spinner from "../../icons/Spinner";

export const ButtonStyles = css`
  max-width: ${b_mobile};
  ${title}
  margin: 0 auto;
  text-decoration: none;
  text-align: center;
  display: block;
  background: ${c_white};
  background: ${props => (props.inverse ? c_black : null)}
    ${props => (props.branded ? c_red : null)};
  &:focus {
    background: inherit;
    background: ${props => (props.inverse ? c_black : null)}
      ${props => (props.branded ? c_red : null)};
  }
  color: ${props => c_black} !important;
  color: ${props => (props.inverse ? c_white : null)}
    ${props => (props.branded ? c_white : null)} !important;

    stroke: ${props => (!props.inverse && !props.branded ? c_black : null)};
  }
  border-radius: ${m_radius_sm};
  padding: 0.8em 0px;
  margin: 1em auto;
  cursor: pointer;
  user-select: none;
  box-shadow: ${c_black_a25} 0px 1px 1px, rgba(44, 44, 44, 0.125) 0px 0px 0px 1px;
  &:active {
    background: ${c_black} !important;
    box-shadow: 0 0 ${c_black} inset;
    color: ${c_white} !important;
  }

  @media (max-width: ${b_mobile}) {
    max-width: 100vw;
    border-radius: 0;
    section & {
          margin-left: -1.5em;
    }
  }
`;

export const LinkButton = styled(
  ({ branded, inverse, responsiveMobileOnly, ...props }) => {
    const Link = props.linkComponent;
    const { linkComponent, ...validProps } = props;
    return <Link {...validProps} />;
  }
)`
  ${ButtonStyles};
`;

export const ButtonInner = styled(
  ({ branded, inverse, responsiveMobileOnly, ...props }) => {
    const Loader = props.loaderComponent || null;
    return (
      <button
        className={props.className}
        style={props.style}
        onClick={props.onClick}
        disabled={props.loading}
      >
        {Loader && <Loader style={props.loading ? null : { width: "0" }} />}
        {props.children}
      </button>
    );
  }
)`
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

export const TinyButtonStyles = styled(
  ({ responsiveMobileOnly, followComposerCursor, ...props }) => (
    <LinkButton {...props} />
  )
)`
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
export const TinyButton = props => {
  return <TinyButtonStyles {...props}>{props.children}</TinyButtonStyles>;
};

export const ButtonStrip = styled.div`
  & > div {
    display: flex;
    margin: 0;
  }
  width: 10em;
`;

export const Item = styled(({ left, right, script, ...props }) => (
  <TinyButton {...props} />
))`
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

export default props => (
  <ButtonInner loaderComponent={props.loading ? Spinner : null} {...props}>
    {props.children}
  </ButtonInner>
);
