import styled, { css } from "styled-components";

import {
  c_black,
  c_yellow,
  c_black_a25,
} from "../../../../../constants/styles/colors";
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
  padding: 1em 2em 4em;
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
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 6em;
    bottom: -2px;
    right: 0px;

    ${props =>
      props.image &&
      `
      background: url(${props.image});
      background-size: cover;
      clip-path: polygon(100% 0, 0% 100%, 100% 100%);
      box-shadow: 0 0 4em ${c_black_a25} inset;

    `};
  }
  :active,
  :focus,
  .touch &:hover {
    background: ${c_yellow} !important;
  }
`;
