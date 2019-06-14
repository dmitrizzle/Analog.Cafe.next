import styled from "styled-components";

import { c_black } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";

export default styled.strong`
  ${title}
  text-align: center;
  display: block;
  font-size: 0.85em;
  position: relative;
  width: 6.5em;
  margin: 2em auto 0;
  cursor: pointer;

  transition: all 250ms cubic-bezier(0, 0.95, 0.95, 1);
  white-space: nowrap;

  > span {
    width: 100%;
    overflow: hidden;
    display: block;
  }

  &::before {
    content: "";
    width: 110%;
    left: -5%;
    height: 2px;
    bottom: -5px;
    background: ${c_black};
    position: absolute;
  }
`;
