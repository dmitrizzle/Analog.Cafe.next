import styled from "styled-components";

import { c_black } from "../../../../../constants/styles/colors";
import {
  b_mobile,
  b_phablet,
} from "../../../../../constants/styles/measurements";

export default styled.div`
  border-bottom: 8px solid ${c_black};
  width: 100%;

  @media (max-width: ${b_mobile}) {
    ${props => props.mobile === "off" && `display: none;`}
  }
  @media (min-width: ${b_phablet}) {
    ${props => props.mobile === "on" && `display: none;`}
  }
`;
