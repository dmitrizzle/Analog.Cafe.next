import styled from "styled-components";

import { c_black } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";

export default styled.strong`
  ${title}
  text-align: center;
  display: block;
  font-size: 0.85em;
  position: relative;
  width: 6.2em;
  margin: 2em auto 0.5em;

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
