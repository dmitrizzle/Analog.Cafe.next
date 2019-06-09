import styled, { css } from "styled-components";

import { c_black, c_white } from "../../../../../constants/styles/colors";
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
  padding: 1em 2em;
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
    width: 3em;
    height: 3em;
    bottom: -1px;
    right: -1px;

    ${props =>
      props.image &&
      `
      background: url(${props.image});
      background-size: cover;
      clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    `};
  }
  :active {
    background: ${c_white} !important;
  }
`;
