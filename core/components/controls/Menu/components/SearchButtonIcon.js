import styled from "styled-components";

import { c_black, c_white } from "../../../../../constants/styles/colors";

export default styled.span`
  svg {
    width: 1em;
    margin: -0.25em 0.15em 0 0;
    z-index: 1;
    position: relative;
    path {
      stroke: ${props => (props.inverse ? c_white : c_black)};
      stroke-width: 2;
    }
    a:active &,
    a:focus &,
    a.active & {
      path {
        stroke: ${c_white};
      }
    }
  }
`;
