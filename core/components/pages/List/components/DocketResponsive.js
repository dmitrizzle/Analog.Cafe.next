import React from "react";
import styled from "styled-components";

import {
  c_black,
  c_grey_light,
  c_grey_med,
  c_white,
} from "../../../../../constants/styles/colors";
import { m_column } from "../../../../../constants/styles/measurements";
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
  transform: translateZ(0);
  background: ${c_grey_light};

  @media (max-width: ${m_column}) {
    height: auto;
    padding-bottom: 1.5em;
  }
  .lazyload-placeholder {
    margin-bottom: -2em;
  }

  :active,
  :focus,
  .touch &:hover {
    background: ${c_black};
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

  @media (max-width: ${m_column}) {
    float: right;
    margin-bottom: -1.5em;
    position: relative;
  }
`;

export const DocketResponsiveInfo = styled(DocketInfo)`
  left: 12.5em;
  padding-left: 1em;
  padding-right: 1em;
  right: 0;
  box-shadow: 0 0 0 1px ${c_grey_med};
  background: ${c_white};

  @media (max-width: ${m_column}) {
    width: calc(100% - 1.5em);
    max-width: 420px;
    padding: 0 0.5em 0.5em 1em;
    left: 0;
    right: 0;
    position: relative;
    background: 0 0;
    box-shadow: none;

    h4 {
      max-width: 40vw;
    }
  }
`;
