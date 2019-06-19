import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import styled, { css, keyframes } from "styled-components";

import { b_phablet } from "../../../../../constants/styles/measurements";
import { c_grey_light, c_white } from "../../../../../constants/styles/colors";
import ZigZag from "../../../icons/ZigZag";

const zigZagSVG = encodeURIComponent(
  renderToStaticMarkup(<ZigZag fill={c_white} />)
);
const zigZagDataUri = `url("data:image/svg+xml,${zigZagSVG}")`;

const slide = keyframes`
  from { transform: translateX(1em);   }
  to { transform: translateX(0);  }
`;
export default styled.div`
  @media (min-width: ${b_phablet}) {
    background-color: ${c_grey_light};
    background-size: cover;
    background-position: right 22%;

    height: calc(12em);
    position: absolute;
    top: 0.5em;
    left: 0;
    right: 0;
    z-index: -1;

    mask-image: ${zigZagDataUri};
    mask-size: 300px 200px;
    mask-repeat: no-repeat;

    transform: translateX(1em);
    transition: transform 250ms cubic-bezier(0.4, 0.4, 0.65, 1.23);

    filter: invert(1);
  }
`;
