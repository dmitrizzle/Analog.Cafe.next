import styled from "styled-components";

import { c_black, c_red } from "../../../../../constants/styles/colors";

export default styled.span`
  color: ${props => {
    if (props.branded) return { c_black };
    return { c_red };
  }};
`;
