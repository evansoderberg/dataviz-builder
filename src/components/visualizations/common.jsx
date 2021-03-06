import React from "react";
import { DIMENSIONS, TRANSFORM_X_AXIS_LABEL } from "../../constants";

const Y_AXIS_X_COORD = 0 - DIMENSIONS.height / 2;
const Y_AXIS_Y_COOD = 30;

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
      <text className="axisLabel" transform={TRANSFORM_X_AXIS_LABEL}>
        {xAxis}
      </text>
      <text
        className="axisLabel"
        transform="rotate(-90)"
        x={Y_AXIS_X_COORD}
        y={Y_AXIS_Y_COOD}
      >
        {yAxis}
      </text>
    </>
  );
};
