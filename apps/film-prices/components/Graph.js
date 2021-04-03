import React from "react";
import styled from "styled-components";

import { filmPriceStats } from "../utils";
import { m_radius_sm } from "../../../constants/styles/measurements";

const GraphSVG = styled.svg`
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  background: ${({ theme }) => theme.grey_light};
  border-radius: calc(${m_radius_sm} / 1.5);

  polyline {
    stroke: ${({ theme }) => theme.fg};
    stroke-width: 2;
    fill: none;
  }
`;

const Graph = ({ userCurrency, dimensions, style, data }) => {
  const matrix = data || filmPriceStats(userCurrency).avgByDate;
  matrix.sort((a, b) => a.date - b.date);

  let points = "";
  let matrixMaxValue = 0;
  let matrixMinValue = 10000000;
  matrix.forEach(date => {
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
      viewBox={`-2.5 -7.5 ${dimensions.w + 5} ${dimensions.h + 15}`}
      w={dimensions.w + 5}
      h={dimensions.h + 15}
      style={style}
    >
      <polyline points={points} />
    </GraphSVG>
  );
};

export default Graph;
