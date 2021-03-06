import React from "react";
import { X_AXIS, Y_AXIS, LINE_CHART, BAR_COLOR, BLUE } from "../../constants";
import AxisSelection from "./AxisSelection";

const OptionFactory = props => {
  switch (props.type) {
    case X_AXIS:
    case Y_AXIS:
      return (
        <AxisSelection
          label={props.label}
          value={props.value}
          options={props.options}
          onChange={props.onChange}
        />
      );
    case LINE_CHART:
      return (
        <label>
          {props.label}
          <input name={props.type} type="checkbox" onChange={props.onChange} />
        </label>
      );
    case BAR_COLOR:
      return (
        <label>
          {props.label}
          <input
            type="color"
            id={props.type}
            name={props.type}
            defaultValue={BLUE}
            onChange={props.onChange}
          />
        </label>
      );
    default:
      return null;
  }
};

export default OptionFactory;
