import styled, { css } from "styled-components";

import {
  b_phablet,
  b_tablet,
} from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_grey_med,
  c_yellow,
} from "../../../../../constants/styles/colors";

const base = css`
  font-size: 0.8em;
  font-style: italic;
  position: relative;
  margin: -8px -1.85em 0;
  overflow: hidden;
  clear: both;
  padding: ${1.5 * 2}em 1.5em;
  border-top: 8px solid ${c_black};
  border-bottom: 8px solid ${c_black};
`;
const content = css`
  &:not(.focus) {
    :first-letter {
      font-size: ${3 * 2}em;
      font-style: normal;
      font-weight: 700;
      float: left;
      margin: 0.3em 0.075em 0.075em 0;
      ::selection {
        background: ${c_yellow};
      }
    }
    @media (min-width: ${b_phablet}) {
      column-count: 2;
      column-gap: ${1.5 * 2}em;
    }
  }
  &.focus {
    box-shadow: 0 8px 0 ${c_yellow}, 0 8px 0 ${c_yellow};
  }
  p {
    margin: 0;
  }
  @media (min-width: ${b_tablet}) {
    &:not(.focus) p:first-of-type {
      min-height: ${3 * 4}em;
    }
  }
`;
const marks = css`
  &::before,
  &::after {
    color: ${c_grey_med};
    content: "“";
    display: block;
    position: absolute;
    top: ${1 / 4}em;
    left: 0;
    font-size: ${3 * 2}em;
    font-weight: 700;
  }
  &::after {
    content: "”";
    top: initial;
    left: initial;
    bottom: -${1 / 5}em;
    right: 0;
  }
  &.focus::before {
    content: "Edit Quote:";
    font-size: 3em;
  }
`;
export const styles = css`
  ${base} ${content} ${marks};
  @media (min-width: ${b_phablet}) {
    &:not(.focus) > span {
      ${
        "" /* shim to ensure that first huge letter doesn't get sliced by Chrome */
      }
      display: block;
      min-height: 13em;
    }
  }
`;
export default styled.blockquote`
  ${styles};
`;
