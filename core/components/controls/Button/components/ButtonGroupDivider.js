import styled from "styled-components";

import {
  b_mobile,
  b_phablet,
} from "../../../../../constants/styles/measurements";

export default styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.fg};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.bg};
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
