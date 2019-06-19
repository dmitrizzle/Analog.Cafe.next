import styled, { css } from "styled-components";

import {
  b_movie,
  b_phablet,
  b_tablet,
} from "../../../../../constants/styles/measurements";

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
  margin: 0 !important;

  padding: 0;
  li {
    display: flex;
    list-style: none;
    position: relative;
    justify-content: flex-end;
    &:hover,
    &:active {
      .film-leader {
        transform: translateX(0);
      }
    }
  }
`;
