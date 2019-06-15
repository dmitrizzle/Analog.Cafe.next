import styled from "styled-components";

import { c_black } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";

export default styled.strong`
  ${title}
  text-align: center;
  display: block;
  font-size: 0.85em;
  position: relative;
  margin: 2em auto 0;
  cursor: pointer;

  width: 6.5em;
  transition: width 250ms cubic-bezier(0.5, 0.5, 0.25, 1.5);
  white-space: nowrap;

  > span {
    width: 100%;
    overflow-x: hidden;
    display: block;

    ${"" /* prevent cut off ltters */}
    padding-bottom: 1px;
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
