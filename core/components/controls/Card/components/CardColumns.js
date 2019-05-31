import styled from "styled-components";

import {
  b_mobile,
  b_tablet,
} from "../../../../../constants/styles/measurements";
import CardIntegrated from "./CardIntegrated";

export default styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${b_tablet}) {
    display: block;
  }
`;
export const CardIntegratedForColumns = styled(CardIntegrated)`
  width: ${b_mobile};
`;
