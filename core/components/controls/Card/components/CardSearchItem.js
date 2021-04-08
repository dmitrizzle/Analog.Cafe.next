import styled, { css } from "styled-components";

import { paragraph } from "../../../../../constants/styles/typography";
import { styles } from "./CardButton";
import LinkButton from "../../Button/components/LinkButton";

export const searchTextStyles = css`
  text-align: left;
  position: relative;
  padding: 0 0 0.5em;
  color: ${({ theme }) => theme.fg};
`;

export default styled(LinkButton)`
  ${styles};
  font-size: 1.15em;
  padding: 2em 0 1.5em;
  position: relative;
  div {
    font-size: 0.85em;
    ${searchTextStyles};
    text-align: center;
    padding: 0 1.5em;
  }
  em {
    ${paragraph};
    font-size: 0.7em;

    ${searchTextStyles};
    display: inline-block;
    text-align: center;
    padding: 0 1.5em;
  }
  figure {
    height: 9em;
    overflow: hidden;
    margin: 1em 0;
    background-size: cover;
    background-position: center;
  }
  :active,
  :focus,
  .touch &:not(.card-button):hover {
    background: ${({ theme }) => theme.highlight} !important;
  }
`;
