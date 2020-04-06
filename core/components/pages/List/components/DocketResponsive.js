import React from "react";
import styled from "styled-components";

import {
  c_grey_light,
  c_grey_med,
  c_white,
} from "../../../../../constants/styles/colors";
import { m_radius } from "../../../../../constants/styles/measurements";
import Docket, { DocketImage, DocketInfo } from "../../../controls/Docket";
import Leader from "../../../icons/Leader";
import Lines from "../../../icons/Lines";

const LeaderSVG = encodeURIComponent(renderToStaticMarkup(<Leader />));
const LeaderDataUri = `url("data:image/svg+xml,${LeaderSVG}")`;
const LinesSVG = encodeURIComponent(renderToStaticMarkup(<Lines />));
const LinesDataUri = `url("data:image/svg+xml,${LinesSVG}")`;

import { renderToStaticMarkup } from "react-dom/server";

export const DocketResponsive = styled(Docket)`
  margin: 0;
  width: 100%;
  background: ${c_grey_light};

  transform: translateZ(0);

  @media (max-width: 500px) {
    height: auto;
    padding-bottom: 1.5em;
  }
  .lazyload-placeholder {
    margin-bottom: -2em;
  }
`;
export const DocketResponsiveImage = styled(DocketImage)`
  mask-image: ${props => (props.tag === "link" ? LinesDataUri : LeaderDataUri)};
  mask-size: ${props => (props.tag === "link" ? "12em 6em" : "12em 7em")};
  width: 12em;
  height: 7.5em;

  mask-repeat: no-repeat;
  mask-origin: stroke-box;
  mask-position: top right;
  top: 0.5em;
  left: 0.5em;

  @media (max-width: 500px) {
    float: right;
    margin-bottom: -2em;
  }
`;

export const DocketResponsiveInfo = styled(DocketInfo)`
  left: 12.5em;
  padding-left: 1em;
  padding-right: 1em;
  right: 0;
  background: ${c_white};

  @media (max-width: 500px) {
    width: calc(100% - 1.5em);
    left: 0;
    padding: 0 0.5em 0.5em 1em;
    right: 0;
    position: relative;

    h4 {
      max-width: 40vw;
    }
  }
`;
