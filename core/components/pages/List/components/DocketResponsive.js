import React from "react";
import styled from "styled-components";

import {
  b_phablet,
  m_radius,
} from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_black_a5,
  c_grey_light,
  c_grey_med,
  c_white,
  c_yellow,
} from "../../../../../constants/styles/colors";
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
  overflow: visible;
  height: 11em;

  @media (max-width: ${b_phablet}) {
    background: ${c_white};

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
  /* transform: rotate(5deg); */
  box-shadow: 0 0 4em ${c_black_a5} inset;
  /* transition: filter 500ms; */

  mask-repeat: no-repeat;
  mask-origin: stroke-box;
  mask-position: top right;
  top: 1.25em;
  left: -4em;

  a:active &,
  a:focus &,
  .touch a:hover & {
    filter: invert(1);
  }

  @media (max-width: ${b_phablet}) {
    transform: rotate(0);
    top: 0.5em;
    left: 0em;
    float: right;
    margin-bottom: -1.5em;
    position: relative;
  }
`;

export const DocketResponsiveInfo = styled(DocketInfo)`
  left: 7.5em;
  padding-left: 1em;
  padding-right: 1em;
  right: 0;
  border-radius: 0 ${m_radius} ${m_radius} 0;
  background: ${c_white};
  box-shadow: -1px 0px 0 0 ${c_grey_med};

  :active,
  :focus,
  .touch &:hover {
    background: ${c_yellow};
  }

  @media (max-width: ${b_phablet}) {
    border-radius: ${m_radius};
    background: 0 0;
    box-shadow: none;
    width: calc(100% - 1.5em);
    max-width: 420px;
    padding: 0 0.5em 0.5em 1em;
    left: 0;
    right: 0;
    position: relative;

    h4 {
      max-width: 40vw;
    }
  }
`;
