import React from "react";
import * as d3 from "d3";
import { RED } from "./constants";

const LinePath = props => {
  // Render a path calculated by d3.line, and scaled accordingly.
  const { data, xAxis, yAxis, xScale, yScale } = props;

  const xDomain = d3.extent(data, d => d[xAxis]);
  const yDomain = d3.extent(data, d => d[yAxis]);
  xScale.domain(xDomain);
  yScale.domain(yDomain);

  const lineGenerator = d3.line();
  lineGenerator.x(d => xScale(d[xAxis]));
  lineGenerator.y(d => yScale(d[yAxis]));
  const path = lineGenerator(data);

  return <path d={path} fill="none" stroke={RED} strokeWidth="2" />;
};

export default LinePath;
