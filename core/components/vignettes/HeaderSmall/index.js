import styled from "styled-components";

import {
  c_black_a25,
  c_red,
  c_transparent,
} from "../../../../constants/styles/colors";
import { title } from "../../../../constants/styles/typography";

export default styled.header`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  position: relative;
  box-shadow: ${c_black_a25} 0px 1px 1px,
    rgba(44, 44, 44, 0.125) 0px 0px 0px 1px;
  padding: 0.25em 0.5em;

  h3,
  input {
    ${title};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    padding: 0;
  }
  h3::before,
  ${props =>
      !props.noStar &&
      `input::before {
    content: "❐ ";
  }`}
    a {
    text-decoration: none;
    line-height: 1.25em;
  }
  a:active {
    background: ${c_transparent};
    color: ${c_red};
  }
`;
