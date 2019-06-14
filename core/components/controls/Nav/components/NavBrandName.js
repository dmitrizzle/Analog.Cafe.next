import styled, { css, keyframes } from "styled-components";

import { c_black } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";

const animateIn = keyframes`
  from { width: 6em;   }
  to { width: 6.5em;   }
`;

export default styled.strong`
  ${title}
  text-align: center;
  display: block;
  font-size: 0.85em;
  position: relative;
  width: 6.5em;
  margin: 2em auto 0.5em;
  cursor: pointer;

  transition: width 250ms cubic-bezier(0, 0.95, 0.95, 1);
  white-space: nowrap;

  ${props =>
    props.homepage &&
    `
    &::before {
      content: "";
      width: 110%;
      left: -5%;
      height: 2px;
      bottom: -5px;
      background: ${c_black};
      position: absolute;
    }
  `};
`;
