import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import styled, { css } from "styled-components";

import {
  b_laptop,
  b_movie,
  b_phablet,
  b_tablet,
  m_column,
  m_radius_sm,
} from "../../../../../constants/styles/measurements";
import {
  c_black,
  c_grey_light,
  c_grey_med,
  c_transparent,
  c_white,
  c_yellow,
} from "../../../../../constants/styles/colors";
import { sectionTitle } from "../../Article/components/ArticleSection";
import { subtitleStyles } from "../../../vignettes/HeaderLarge/components/HeaderSubtitle";
import { title } from "../../../../../constants/styles/typography";
import ZigZag from "../../../icons/ZigZag";

// change colour of mask if changing website background color:
const zigZagSVG = encodeURIComponent(
  renderToStaticMarkup(<ZigZag fill={c_white} />)
);
const zigZagDataUri = `url("data:image/svg+xml,${zigZagSVG}")`;

const zigzagWidthShim = css`
  width: calc(33% + 0px);
  @media (max-width: ${b_tablet}) {
    width: calc(15% + 0px);
  }
  @media (max-width: ${b_phablet}) {
    width: 1em;
  }
`;
const zigzagFill = css`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`;
const zigzagDimensions = css`
  ${zigzagWidthShim} ${zigzagFill} display: block;
  content: "";
  z-index: 10;
  pointer-events: none;
`;

export default styled.ul`
  position: relative;
  max-width: ${b_movie};
  margin: 0 auto;

  padding-right: 1.5em;
  padding-left: 1.5em;

  ${"" /* &::after {
    ${zigzagDimensions}
    background-size: 		23em 36em;
    background-image: ${zigZagDataUri};
    background-repeat: repeat-y;
  } */}
  li {
    display: flex;
    list-style: none;
    position: relative;
  }
  &:first-child li:first-child {
    padding-top: ${props => (props.author ? 17 : 12)}em;
  }
`;
