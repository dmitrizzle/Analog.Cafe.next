import styled from "styled-components";

import {
  b_mobile,
  b_phablet,
  m_column,
} from "../../../../constants/styles/measurements";

export const HideOnMobile = styled.span`
  @media (max-width: calc(${b_mobile} + 50px)) {
    display: none;
  }
`;
export const HideOnLargePhablet = styled.span`
  @media (max-width: ${m_column}) {
    display: none;
  }
`;
export const HideOnPhablet = styled.span`
  @media (max-width: ${b_phablet}) {
    display: none;
  }
`;
export const ShowOnPhablet = styled.span`
  @media (min-width: calc(${b_phablet} + 1px)) {
    display: none;
  }
`;
