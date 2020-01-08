import React from "react";
import "./index.css";
import {
  SCATTER_PLOT,
  BAR_GRAPH,
  X_AXIS,
  Y_AXIS,
  LINE_CHART,
  BAR_COLOR
} from "../../constants";
import { SCATTER_PLOT_OPTIONS } from "../visualizations/ScatterPlot";
import { BAR_GRAPH_OPTIONS } from "../visualizations/BarGraph";
import OptionFactory from "./OptionFactory";

const OPTIONS_COMPONENTS = {};
OPTIONS_COMPONENTS[SCATTER_PLOT] = SCATTER_PLOT_OPTIONS;
OPTIONS_COMPONENTS[BAR_GRAPH] = BAR_GRAPH_OPTIONS;

/**
 * Different visualizations may make use of different options.
 * This component is used to generate option components and
 * handle change events for various options.
 */
const Options = ({ visualizationChoice, data, options, onChange }) => {
  const { xAxis, yAxis, lineChart } = options;
  // Get first entry from csv, use object keys as axes.
  const dataKeys = Object.keys(data[0]);
  const visualizationOptions = OPTIONS_COMPONENTS[visualizationChoice];

  const onOptionChange = (option, event) => {
    const changeArg = {};
    changeArg[option] = event.target.value;
    onChange(changeArg);
  };

  const handleLineChartToggle = () => {
    onChange({ lineChart: !lineChart });
  };

  const optionPropsMapping = {};
  optionPropsMapping[X_AXIS] = {
    label: "X Axis",
    value: xAxis,
    options: dataKeys,
    onChange: event => onOptionChange("xAxis", event)
  };
  optionPropsMapping[Y_AXIS] = {
    label: "Y Axis",
    value: yAxis,
    options: dataKeys,
    onChange: event => onOptionChange("yAxis", event)
  };
  optionPropsMapping[LINE_CHART] = {
    label: "Line Chart",
    onChange: handleLineChartToggle
  };
  optionPropsMapping[BAR_COLOR] = {
    label: "Bar Color",
    onChange: event => onOptionChange("barColor", event)
  };

  return (
    <div className="Options-container">
      {visualizationOptions.map(type => {
        const optionProps = optionPropsMapping[type];
        return <OptionFactory key={type} type={type} {...optionProps} />;
      })}
    </div>
  );
};

export default Options;
