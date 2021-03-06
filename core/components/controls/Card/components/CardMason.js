import styled, { css } from "styled-components";

import {
  m_column_lg,
  m_radius,
} from "../../../../../constants/styles/measurements";
import CardIntegrated from "./CardIntegrated";

export default styled.div`
  margin: 0 1.5em;
  column-count: 2;
  column-gap: 1.5em;
  @media (max-width: ${m_column_lg}) {
    margin: 0 auto;
    max-width: 360px;
    column-count: 1;
  }
`;
export const CardIntegratedForMason = styled(CardIntegrated)`
  display: inline-block;
  margin: 1px 0 1.5em !important;
  ${props =>
    props.buttonContainer &&
    css`
      > a,
      > button {
        margin-top: 1em;
        border-radius: ${m_radius} !important;
        box-shadow: 0 0 0 1px ${({ theme }) => theme.grey_med} inset;
      }
    `}
  width: 100%;
  max-width: 100%;

  position: static;
  transform: none;
`;
