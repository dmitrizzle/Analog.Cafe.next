import styled from "styled-components";

import { b_phablet } from "../../../../../constants/styles/measurements";
import Docket, { DocketImage, DocketInfo } from "../../../controls/Docket";

export const DocketResponsive = styled(Docket)`
  margin: 0 auto 1em;
  max-width: 32.223em;
  width: 100%;

  @media (max-width: 500px) {
    height: auto;
  }
`;
export const DocketResponsiveImage = styled(DocketImage)`
  @media (max-width: 500px) {
    width: 100%;
    height: 5em;
    position: relative;
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
