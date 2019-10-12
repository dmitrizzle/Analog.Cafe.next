import styled from "styled-components";

import {
  b_mobile,
  b_phablet,
  m_column,
} from "../../../../constants/styles/measurements";

export const HideOnMobile = styled.span`
  @media (max-width: ${b_mobile}) {
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
