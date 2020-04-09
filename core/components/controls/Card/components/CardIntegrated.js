import styled, { css } from "styled-components";

import {
  b_mobile,
  m_column_lg,
  m_radius,
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
  /* box-shadow: 0 0 0 1px ${c_grey_med};
  border-radius: ${m_radius_sm}; */

  header {
    box-shadow: none;
  }
  /* > div {
    border-radius: ${m_radius};
    overflow: hidden;
     box-shadow: 0 0 0 1px ${c_grey_med} inset;
     margin-top: 1em;
  } */
  max-width: 100%;

  ${props =>
    !props.rigid &&
    css`
      @media (max-width: ${m_column_lg}) {
        max-width: 100% !important;
        width: 360px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      @media (max-width: ${b_mobile}) {
        margin-right: 0 !important;
      }
    `}

  @media (max-width: ${b_mobile}) {
    max-width: 100vw !important;
    width: 100vw;
    border-radius: 0;
    margin-left: 0 !important;
    & a {
      margin-left: 0;
      max-width: 100%;
    }
  }
`;

export const CardCaptionIntegrated = styled(CardCaption)`
  font-size: 0.8em !important;
`;
