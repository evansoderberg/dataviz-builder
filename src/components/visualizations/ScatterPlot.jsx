import React, { useRef } from "react";
import * as d3 from "d3";

import { FixedDimensionSvg, AxisLabels } from "./common";
import { useD3Scales } from "./hooks";
import LinePath from "./LinePath";
import {
  TRANSFORM_X_AXIS,
  TRANSFORM_Y_AXIS,
  RED,
  DIMENSIONS,
  X_AXIS,
  Y_AXIS,
  LINE_CHART
} from "../../constants";

export const SCATTER_PLOT_OPTIONS = [X_AXIS, Y_AXIS, LINE_CHART];

const ScatterPlot = props => {
  const { data, options } = props;
  const { xAxis, yAxis, lineChart } = options;
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

  const renderLineChart = () => {
    // Optionally render a path connecting all points
    // in the scatter plot. First we'll have to sort the
    // data against the x axis values to make a continuous path.
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
      {renderLineChart()}
      <AxisLabels xAxis={xAxis} yAxis={yAxis} />
    </FixedDimensionSvg>
  );
};

export default ScatterPlot;
