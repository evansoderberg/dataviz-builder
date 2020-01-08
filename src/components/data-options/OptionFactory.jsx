import React from "react";
import { X_AXIS, Y_AXIS, LINE_CHART } from "../../constants";
import AxisSelection from "./AxisSelection";

const OptionFactory = props => {
  switch (props.type) {
    case X_AXIS:
      return (
        <AxisSelection
          label="X Axis"
          value={props.xAxis}
          options={props.dataKeys}
          onChange={props.handleXChange}
        />
      );
    case Y_AXIS:
      return (
        <AxisSelection
          label="Y Axis"
          value={props.yAxis}
          options={props.dataKeys}
          onChange={props.handleYChange}
        />
      );
    case LINE_CHART:
      return (
        <label>
          Line Chart
          <input
            name="lineChart"
            type="checkbox"
            onChange={props.handleLineChartToggle}
          />
        </label>
      );
    default:
      return null;
  }
};

export default OptionFactory;
