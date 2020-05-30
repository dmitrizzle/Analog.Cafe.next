import styled, { css } from "styled-components";

import { c_black, c_yellow } from "../../../../../constants/styles/colors";
import { styles } from "./CardButton";

import LinkButton from "../../Button/components/LinkButton";

export const searchTextStyles = css`
  text-align: left;
  position: relative;
  padding: 0 0 0.5em;
  color: ${c_black};
`;

export default styled(LinkButton)`
  ${styles};
  font-size: 1.15em;
  padding: 1em 2em 2em;
  position: relative;
  text-align: left;
  div {
    font-size: 0.85em;
    ${searchTextStyles};
  }
  em {
    font-family: Lora, serif;
    font-size: 0.7em;
    font-weight: 400;
    ${searchTextStyles};
    display: inline-block;
    text-align: left;
  }
  figure {
    margin-top: 0.5em;
  }
  :active,
  :focus,
  .touch &:hover {
    background: ${c_yellow} !important;
  }
`;
