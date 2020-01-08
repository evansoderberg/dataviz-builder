import React from "react";
import { DIMENSIONS, TRANSFORM_X_AXIS_LABLE } from "./constants";
import "./index.css";

export const FixedDimensionSvg = props => {
  return (
    <svg width={DIMENSIONS.width} height={DIMENSIONS.height}>
      {props.children}
    </svg>
  );
};

export const AxisLabels = props => {
  const { xAxis, yAxis } = props;
  return (
    <>
      <text className="axisLable" transform={TRANSFORM_X_AXIS_LABLE}>
        {xAxis}
      </text>
      <text
        className="axisLable"
        transform="rotate(-90)"
        x={0 - DIMENSIONS.height / 2}
        y={30}
      >
        {yAxis}
      </text>
    </>
  );
};
