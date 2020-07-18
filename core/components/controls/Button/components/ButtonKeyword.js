import styled from "styled-components";

import { c_red } from "../../../../../constants/styles/colors";

export default styled.span`
  color: ${(branded, theme) => {
    if (branded) return theme.fg;
    return { c_red };
  }};
`;
