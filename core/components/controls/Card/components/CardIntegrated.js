import styled, { css } from "styled-components";

import {
  b_mobile,
  m_radius_sm,
} from "../../../../../constants/styles/measurements";
import { c_grey_med } from "../../../../../constants/styles/colors";
import CardCaption from "./CardCaption";
import CardPopup from "./CardPopup";

export default styled(CardPopup)`
  margin: 1.5em 1.5em 1em 0;
  &:last-child {
    margin-right: 1px;
  }
  box-shadow: 0 0 0 1px ${c_grey_med};
  border-radius: ${m_radius_sm};

  max-width: 100%;

  ${props =>
    !props.rigid &&
    css`
      @media (max-width: 720px) {
        max-width: 100% !important;
        width: 360px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
    `}

  @media (max-width: ${b_mobile}) {
    max-width: 100vw;
    width: 100vw;
    border-radius: 0;
    margin-left: -1.5em !important;
    & a {
      margin-left: 0;
      max-width: 100%;
    }
  }
`;

export const CardCaptionIntegrated = styled(CardCaption)`
  font-size: 0.8em !important;
`;
