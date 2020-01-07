import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = { top: 20, right: 20, bottom: 20, left: 55 };
const RED = "#ff0000";
const TRANSFORM_X_AXIS = `translate(0, ${HEIGHT - MARGIN.bottom})`;
const TRANSFORM_Y_AXIS = `translate(${MARGIN.left}, 0)`;

function useD3Scales(xAxisRef, yAxisRef, data) {
  // Create linear scales from d3 api, and update when axis selection changes.
  const xScale = d3.scaleLinear().range([MARGIN.left, WIDTH - MARGIN.right]);
  const yScale = d3.scaleLinear().range([HEIGHT - MARGIN.bottom, MARGIN.top]);
  const xAxisComponent = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat(d => `${d}`);

  const yAxisComponent = d3
    .axisLeft()
    .scale(yScale)
    .tickFormat(d => `${d}`);

  useEffect(() => {
    d3.select(xAxisRef.current).call(xAxisComponent);
    d3.select(yAxisRef.current).call(yAxisComponent);
  }, [data, xAxisComponent, yAxisComponent, xAxisRef, yAxisRef]);

  return { xScale, yScale };
}

const FixedDimensionSvg = props => {
  return (
    <svg width={WIDTH} height={HEIGHT}>
      {props.children}
    </svg>
  );
};

export const ScatterPlot = props => {
  const { data, xAxis, yAxis } = props;
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  const { xScale, yScale } = useD3Scales(xAxisRef, yAxisRef, data);

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

  const sortedData = data
    ? data.sort((a, b) => d3.ascending(a[xAxis], b[xAxis]))
    : [];

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
      <PathRenderer
        data={sortedData}
        xAxis={xAxis}
        yAxis={yAxis}
        xScale={xScale}
        yScale={yScale}
      />
    </FixedDimensionSvg>
  );
};

const PathRenderer = props => {
  // Render a path calculated by d3.line, and scaled accordingly.
  const { data, xAxis, yAxis, xScale, yScale } = props;
  const lineGenerator = d3.line();
  const xDomain = d3.extent(data, d => d[xAxis]);
  const yMax = d3.max(data, d => d[yAxis]);
  const yMin = d3.min(data, d => d[yAxis]);
  xScale.domain(xDomain);
  yScale.domain([yMin, yMax]);
  lineGenerator.x(d => xScale(d[xAxis]));
  lineGenerator.y(d => yScale(d[yAxis]));
  const path = lineGenerator(data);
  return <path d={path} fill="none" stroke={RED} strokeWidth="2" />;
};
