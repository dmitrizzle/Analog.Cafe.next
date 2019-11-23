import styled from "styled-components";

import {
  m_column_lg,
  b_phablet,
  b_mobile,
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
  margin: 0 0 0.5em !important;
  width: 100%;
  max-width: 100%;
`;
