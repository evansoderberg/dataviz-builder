import { useEffect } from "react";
import * as d3 from "d3";

export function useD3Scales(
  xAxisRef,
  yAxisRef,
  data,
  dimensions,
  xScaleType = d3.scaleLinear,
  yScaleType = d3.scaleLinear
) {
  /**
   * Create linear scales (by default) from d3 api,
   * and update when axis selection changes.
   */
  const { margin, width, height } = dimensions;
  const xScale = xScaleType().range([margin.left, width - margin.right]);
  const yScale = yScaleType().range([height - margin.bottom, margin.top]);
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
