import styled from "styled-components";

import { c_black, c_yellow } from "../../../../../constants/styles/colors";

export default styled.a`
  :active,
  :focus,
  .active {
    color: ${c_black};
    background: ${c_yellow};
  }
`;
