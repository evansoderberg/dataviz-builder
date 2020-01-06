import React, { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";

const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = { top: 20, right: 20, bottom: 20, left: 55 };
const RED = "#ff0000";
const TRANSFORM_X_AXIS = `translate(0, ${HEIGHT - MARGIN.bottom})`;
const TRANSFORM_Y_AXIS = `translate(${MARGIN.left}, 0)`;

export const LineChart = props => {
  const { data, xAxis, yAxis } = props;
  const [path, setPath] = useState(null);
  const xAxisRef = useRef();
  const yAxisRef = useRef();

  const xScale = d3.scaleLinear().range([MARGIN.left, WIDTH - MARGIN.right]);
  const yScale = d3.scaleLinear().range([HEIGHT - MARGIN.bottom, MARGIN.top]);
  const lineGenerator = d3.line();

  const xAxisComponent = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat(d => `${d}`);

  const yAxisComponent = d3
    .axisLeft()
    .scale(yScale)
    .tickFormat(d => `${d}`);

  useEffect(() => {
    if (!data) return;
    const xDomain = d3.extent(data, d => d[xAxis]);
    const yMax = d3.max(data, d => d[yAxis]);
    const yMin = d3.min(data, d => d[yAxis]);
    xScale.domain(xDomain);
    yScale.domain([yMin, yMax]);
    lineGenerator.x(d => xScale(d[xAxis]));
    lineGenerator.y(d => yScale(d[yAxis]));
    setPath(lineGenerator(data));
  }, [data, xAxis, yAxis, xScale, yScale, lineGenerator]);

  useEffect(() => {
    d3.select(xAxisRef.current).call(xAxisComponent);
    d3.select(yAxisRef.current).call(yAxisComponent);
  }, [data, xAxisComponent, yAxisComponent]);

  return (
    <svg width={WIDTH} height={HEIGHT}>
      <path d={path} fill="none" stroke={RED} strokeWidth="2" />
      {/* TODO: support multiple datasets for stacked line charts */}
      <g>
        <g ref={xAxisRef} transform={TRANSFORM_X_AXIS} />
        <g ref={yAxisRef} transform={TRANSFORM_Y_AXIS} />
      </g>
    </svg>
  );
};

export const ScatterPlot = props => {
  const { data, xAxis, yAxis } = props;
  const xAxisRef = useRef();
  const yAxisRef = useRef();

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
  }, [data, xAxis, yAxis, xAxisComponent, yAxisComponent]);

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

  return (
    <svg width={WIDTH} height={HEIGHT}>
      <g ref={xAxisRef} transform={TRANSFORM_X_AXIS} />
      <g ref={yAxisRef} transform={TRANSFORM_Y_AXIS} />
      <g>
        {points.map((d, i) => {
          return (
            <circle key={i} cx={d.x} cy={d.y} r="5" style={{ fill: RED }} />
          );
        })}
      </g>
    </svg>
  );
};
