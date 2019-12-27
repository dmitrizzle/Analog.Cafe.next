import styled from "styled-components";

import { c_black, c_grey_dark } from "../../../../constants/styles/colors";

export default styled.ul`
  display: ${props => props.hidden && "none"};
  margin: 0.5em 0 !important;
  color: ${c_grey_dark};
  font-size: 0.7em;
  font-style: italic;
  li {
    line-height: 1.5em !important;
    padding-bottom: 0 !important;
    span {
      font-style: normal;
      color: ${c_black};
      font-size: 1.05em;
    }
  }
`;
