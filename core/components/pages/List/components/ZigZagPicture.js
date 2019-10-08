import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import styled from "styled-components";

import {
  b_tablet,
  b_movie,
} from "../../../../../constants/styles/measurements";
import { c_grey_light } from "../../../../../constants/styles/colors";
import Leader from "../../../icons/Leader";
import Lines from "../../../icons/Lines";

const LeaderSVG = encodeURIComponent(renderToStaticMarkup(<Leader />));
const LeaderDataUri = `url("data:image/svg+xml,${LeaderSVG}")`;

const LinesSVG = encodeURIComponent(renderToStaticMarkup(<Lines />));
const LinesDataUri = `url("data:image/svg+xml,${LinesSVG}")`;

export default styled.div`
  @media (min-width: ${b_tablet}) {
    background-color: ${c_grey_light};
    background-size: cover;

    height: 10em;
    width: 15em;
    position: absolute;
    top: 0.5em;
    right: 0;
    z-index: -1;

    left: -10vw;

    mask-image: ${props =>
      props.tag === "download" ? LinesDataUri : LeaderDataUri};
    mask-size: 15em 10em;
    mask-repeat: no-repeat;

    filter: ${props =>
      props.tag === "download"
        ? `hue-rotate(-40deg) contrast(.75) saturate(1.5)`
        : `invert(1) brightness(0.5) sepia(0.33)`};

    transform: translateX(0);
    transition: transform 250ms ease-out;
  }
  @media (min-width: ${b_movie}) {
    left: -10em;
  }
`;
