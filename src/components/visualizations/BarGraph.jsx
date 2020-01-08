import React, { useRef } from "react";
import * as d3 from "d3";

import { FixedDimensionSvg, AxisLabels } from "./common";
import { useD3Scales } from "./hooks";
import {
  TRANSFORM_X_AXIS,
  TRANSFORM_Y_AXIS,
  DIMENSIONS,
  X_AXIS,
  Y_AXIS
} from "../../constants";

export const BAR_GRAPH_OPTIONS = [X_AXIS, Y_AXIS];

const BarChart = props => {
  const { data, options } = props;
  const { xAxis, yAxis } = options;
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  const xScaleType = d3.scaleBand;
  const { xScale, yScale } = useD3Scales(
    xAxisRef,
    yAxisRef,
    data,
    DIMENSIONS,
    xScaleType
  );

  let bars = [];
  if (data) {
    const yDomain = d3.extent(data, d => d[yAxis]);
    xScale
      .domain(
        data.map(function(d) {
          return d[xAxis];
        })
      )
      .padding(0.4);
    yScale.domain(yDomain);

    bars = data.map(d => {
      return {
        x: xScale(d[xAxis]),
        y: yScale(d[yAxis]),
        height: DIMENSIONS.height - DIMENSIONS.margin.bottom - yScale(d[yAxis])
      };
    });
  }

  return (
    <FixedDimensionSvg>
      <g ref={xAxisRef} transform={TRANSFORM_X_AXIS} />
      <g ref={yAxisRef} transform={TRANSFORM_Y_AXIS} />
      <g>
        {bars.map((d, i) => (
          <rect
            key={i}
            x={d.x}
            y={d.y}
            width={xScale.bandwidth()}
            height={d.height}
            fill="blue"
          />
        ))}
      </g>
      <AxisLabels xAxis={xAxis} yAxis={yAxis} />
    </FixedDimensionSvg>
  );
};

export default BarChart;
