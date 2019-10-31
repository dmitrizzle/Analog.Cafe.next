import styled from "styled-components";

import {
  b_movie,
  m_column_lg,
} from "../../../../../constants/styles/measurements";
import CardIntegrated from "./CardIntegrated";

export default styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${m_column_lg}) {
    display: block;
  }
`;
export const CardIntegratedForColumns = styled(CardIntegrated)`
  width: 100%;
  @media (min-width: ${b_movie}) {
    width: 380px;
  }
`;
