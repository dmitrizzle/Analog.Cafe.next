import styled from "styled-components";

import {
  b_mobile,
  b_movie,
} from "../../../../../constants/styles/measurements";
import CardIntegrated from "./CardIntegrated";

export default styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: 720px) {
    display: block;
  }
`;
export const CardIntegratedForColumns = styled(CardIntegrated)`
  width: 100%;
  @media (min-width: ${b_movie}) {
    width: 380px;
  }
`;
