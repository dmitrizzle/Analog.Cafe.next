import styled from "styled-components";

import {
  b_mobile,
  m_radius_sm,
} from "../../../../../constants/styles/measurements";
import { c_black_a25 } from "../../../../../constants/styles/colors";
import CardPopup from "./CardPopup";

export default styled(CardPopup)`
  margin: 1.5em auto 1em;
  box-shadow: 0 1px 1px ${c_black_a25}, 0 0 0 1px rgba(44, 44, 44, 0.125);
  border-radius: ${m_radius_sm}em;

  @media (max-width: 375px) {
    max-width: 100%;
  }
  @media (max-width: ${b_mobile}) {
    max-width: 100vw;
    border-radius: 0;
    width: 100vw;
    margin-left: -1.5em;
    & a {
      margin-left: 0;
    }
  }
`;
