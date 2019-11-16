import styled, { css } from "styled-components";

import { c_black, c_red } from "../../../../../constants/styles/colors";
import { title } from "../../../../../constants/styles/typography";
import Link from "../../Link";

export default styled(Link)`
  ${title}
  text-align: center;
  display: block;
  font-size: 0.85em;
  position: relative;
  margin: 2em auto 0;
  cursor: pointer;

  width: ${props => props.correctedWidth};
  transition: width 250ms cubic-bezier(0.5, 0.5, 0.25, 1.5);
  white-space: nowrap;

  background: inherit !important;
  padding: 0 !important;
  border-radius: 0 !important;

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
  ${props =>
    props.collection &&
    css`
      &::after {
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 5px;
        bottom: -1em;
        left: calc(50% - 0.125em);
        background: ${c_red};
        position: absolute;
      }
    `}
`;
