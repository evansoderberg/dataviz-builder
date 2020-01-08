import React from "react";
import "./index.css";
import {
  X_AXIS,
  Y_AXIS,
  LINE_CHART,
  SCATTER_PLOT,
  BAR_GRAPH
} from "../visualizations/constants";
import { SCATTER_PLOT_OPTIONS } from "../visualizations/ScatterPlot";
import { BAR_GRAPH_OPTIONS } from "../visualizations/BarGraph";

const OPTIONS_COMPONENTS = {};
OPTIONS_COMPONENTS[SCATTER_PLOT] = SCATTER_PLOT_OPTIONS;
OPTIONS_COMPONENTS[BAR_GRAPH] = BAR_GRAPH_OPTIONS;

const AxisSelection = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map(val => {
          return (
            <option key={`label-${val}`} value={val}>
              {val}
            </option>
          );
        })}
      </select>
    </label>
  );
};

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

const Options = ({ graphicChoice, data, options, onChange }) => {
  const { xAxis, yAxis, lineChart } = options;
  const dataKeys = Object.keys(data[0]);
  const optionsToRender = OPTIONS_COMPONENTS[graphicChoice];

  const handleXChange = event => {
    onChange({ xAxis: event.target.value });
  };
  const handleYChange = event => {
    onChange({ yAxis: event.target.value });
  };
  const handleLineChartToggle = event => {
    onChange({ lineChart: !lineChart });
  };

  return (
    <div className="Options-container">
      {optionsToRender.map(type => {
        // TODO: This is a naive solution. Find best way to
        // pass onChange functions instead of generating
        // components with all possible functions.
        return (
          <OptionFactory
            type={type}
            xAxis={xAxis}
            yAxis={yAxis}
            dataKeys={dataKeys}
            handleXChange={handleXChange}
            handleYChange={handleYChange}
            handleLineChartToggle={handleLineChartToggle}
          />
        );
      })}
    </div>
  );
};

export default Options;
