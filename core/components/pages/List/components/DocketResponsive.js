import styled from "styled-components";

import { c_white } from "../../../../../constants/styles/colors";
import { m_radius } from "../../../../../constants/styles/measurements";
import Docket, { DocketImage, DocketInfo } from "../../../controls/Docket";

export const DocketResponsive = styled(Docket)`
  margin: 0;
  width: 100%;
  background: ${c_white};

  transform: translateZ(0);

  @media (max-width: 500px) {
    height: auto;
    padding-bottom: 1.5em;
  }
`;
export const DocketResponsiveImage = styled(DocketImage)`
  @media (max-width: 500px) {
    width: 100%;
    height: 7.5em;
    position: relative;
    border-top-left-radius: ${m_radius};
    border-top-right-radius: ${m_radius};
  }
`;
export const DocketResponsiveInfo = styled(DocketInfo)`
  @media (max-width: 500px) {
    width: calc(100% - 1.5em);
    left: 0;
    padding: 0 0.5em 0.5em 1em;
    right: 0;
    position: relative;
  }
`;
