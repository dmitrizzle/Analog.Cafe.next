import styled from "styled-components";

import {
  b_mobile,
  b_phablet,
} from "../../../../../constants/styles/measurements";
import { c_black, c_white } from "../../../../../constants/styles/colors";

export default styled.div`
  border-bottom: 8px solid ${c_black};
  box-shadow: 0 0 0 1px ${c_white};
  z-index: 1;
  position: relative;
  width: 100%;

  @media (max-width: ${b_mobile}) {
    ${props => props.mobile === "off" && `display: none;`}
  }
  @media (min-width: ${b_phablet}) {
    ${props => props.mobile === "on" && `display: none;`}
  }
`;
