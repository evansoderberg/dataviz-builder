import React, { useRef } from "react";
import * as d3 from "d3";

import { FixedDimensionSvg, AxisLabels } from "./index";
import { useD3Scales } from "./hooks";
import LinePath from "./LinePath";
import {
  TRANSFORM_X_AXIS,
  TRANSFORM_Y_AXIS,
  RED,
  DIMENSIONS
} from "./constants";

const ScatterPlot = props => {
  const { data, xAxis, yAxis, lineChart } = props;
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  const { xScale, yScale } = useD3Scales(xAxisRef, yAxisRef, data, DIMENSIONS);

  let points = [];
  if (data) {
    const xDomain = d3.extent(data, d => d[xAxis]);
    const yDomain = d3.extent(data, d => d[yAxis]);
    xScale.domain(xDomain);
    yScale.domain(yDomain);

    points = data.map(d => {
      return {
        x: xScale(d[xAxis]),
        y: yScale(d[yAxis])
      };
    });
  }

  const lineChartComponent = () => {
    if (!lineChart) return null;
    const sortedData = data
      ? data.sort((a, b) => d3.ascending(a[xAxis], b[xAxis]))
      : [];
    return (
      <LinePath
        data={sortedData}
        xAxis={xAxis}
        yAxis={yAxis}
        xScale={xScale}
        yScale={yScale}
      />
    );
  };

  return (
    <FixedDimensionSvg>
      <g ref={xAxisRef} transform={TRANSFORM_X_AXIS} />
      <g ref={yAxisRef} transform={TRANSFORM_Y_AXIS} />
      <g>
        {points.map((d, i) => {
          return (
            <circle key={i} cx={d.x} cy={d.y} r="3" style={{ fill: RED }} />
          );
        })}
      </g>
      {lineChartComponent()}
      <AxisLabels xAxis={xAxis} yAxis={yAxis} />
    </FixedDimensionSvg>
  );
};

export default ScatterPlot;
