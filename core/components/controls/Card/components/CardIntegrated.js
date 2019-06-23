import styled from "styled-components";

import {
  b_mobile,
  m_radius_sm,
} from "../../../../../constants/styles/measurements";
import { c_grey_med } from "../../../../../constants/styles/colors";
import CardCaption from "./CardCaption";
import CardPopup from "./CardPopup";

export default styled(CardPopup)`
  margin: 1.5em auto 1em;
  box-shadow: 0 0 0 1px ${c_grey_med};
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

export const CardCaptionIntegrated = styled(CardCaption)`
  font-size: 0.8em !important;
`;
