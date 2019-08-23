import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import styled from "styled-components";

import {
  b_tablet,
  b_movie,
} from "../../../../../constants/styles/measurements";
import { c_grey_light, c_white } from "../../../../../constants/styles/colors";
import ZigZag from "../../../icons/ZigZag";

const zigZagSVG = encodeURIComponent(
  renderToStaticMarkup(<ZigZag fill={c_white} />)
);
const zigZagDataUri = `url("data:image/svg+xml,${zigZagSVG}")`;

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

    mask-image: ${zigZagDataUri};
    mask-size: 15em 10em;
    mask-repeat: no-repeat;

    filter: invert(1) brightness(.75) sepia(.33);

    transform: translateX(0);
    transition: transform 250ms ease-out;
  }
  @media (min-width: ${b_movie}) {
    left: -10em;
  }
`;
