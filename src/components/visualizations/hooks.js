import { useEffect } from "react";
import * as d3 from "d3";

export function useD3Scales(xAxisRef, yAxisRef, data, dimensions) {
  // Create linear scales from d3 api, and update when axis selection changes.
  const { margin, width, height } = dimensions;
  const xScale = d3.scaleLinear().range([margin.left, width - margin.right]);
  const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
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
