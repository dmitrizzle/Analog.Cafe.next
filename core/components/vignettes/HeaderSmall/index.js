import styled from "styled-components";

import {
  c_grey_med,
  c_red,
  c_black,
  c_white,
  c_transparent,
} from "../../../../constants/styles/colors";
import { title } from "../../../../constants/styles/typography";

export default styled.header`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 0 0 1px ${c_grey_med};
  line-height: 1.75em;
  padding: 0.1em 0.5em;
  margin-bottom: 1px;

  box-shadow: ${props => props.inverse && "none"};
  margin-bottom: ${props => props.inverse && "0"};
  background: ${props => props.inverse && c_black};

  h3,
  input {
    ${title};
    color: ${props => (props.inverse || props.blue) && c_white};
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
  }
  a:active {
    background: ${c_transparent};
    color: ${c_red};
  }
`;
