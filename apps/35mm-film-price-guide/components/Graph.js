import React from "react";
import styled from "styled-components";

import {
  c_blue,
  c_grey_light,
  c_grey_med,
} from "../../../constants/styles/colors";
import { filmPriceStats } from "../utils";
import { m_radius_sm } from "../../../constants/styles/measurements";

const GraphSVG = styled.svg`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: ${c_grey_light};
  overflow: visible;
  padding: 0.5em;
  border-radius: ${m_radius_sm};
  box-shadow: 0 0 0 1px ${c_grey_med};

  polyline {
    stroke: ${c_blue};
    stroke-width: 2;
    fill: none;
  }
`;
export default ({ userCurrency, dimensions, style, data }) => {
  const matrix = data || filmPriceStats(userCurrency).avgByDate;
  matrix.sort((a, b) => a.date - b.date);

  let points = "";
  let matrixMaxValue = 0;
  let matrixMinValue = 10000000;
  matrix.forEach((date, iterable) => {
    if (date.avg > matrixMaxValue) matrixMaxValue = date.avg;
    if (date.avg < matrixMinValue) matrixMinValue = date.avg;
  });

  matrix.forEach((date, iterable) => {
    const y =
      Math.round(
        ((dimensions.h - (dimensions.h / matrixMaxValue) * date.avg) /
          ((matrixMaxValue + matrixMinValue) / 57.5)) *
          1000
      ) / 1000;
    const x =
      Math.round((dimensions.w / (matrix.length - 1)) * iterable * 1000) / 1000;
    points += `${x},${y} `;
  });

  return (
    <GraphSVG
      viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
      width={dimensions.w}
      height={dimensions.h}
      style={style}
    >
      <polyline points={points} />
    </GraphSVG>
  );
};
