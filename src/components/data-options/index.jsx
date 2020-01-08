import React from "react";
import "./index.css";
import { SCATTER_PLOT, BAR_GRAPH } from "../../constants";
import { SCATTER_PLOT_OPTIONS } from "../visualizations/ScatterPlot";
import { BAR_GRAPH_OPTIONS } from "../visualizations/BarGraph";
import OptionFactory from "./OptionFactory";

const OPTIONS_COMPONENTS = {};
OPTIONS_COMPONENTS[SCATTER_PLOT] = SCATTER_PLOT_OPTIONS;
OPTIONS_COMPONENTS[BAR_GRAPH] = BAR_GRAPH_OPTIONS;

const Options = ({ visualizationChoice, data, options, onChange }) => {
  const { xAxis, yAxis, lineChart } = options;
  // Get first entry from csv, use object keys as axes.
  const dataKeys = Object.keys(data[0]);
  const optionsToRender = OPTIONS_COMPONENTS[visualizationChoice];

  const handleXChange = event => {
    onChange({ xAxis: event.target.value });
  };
  const handleYChange = event => {
    onChange({ yAxis: event.target.value });
  };
  const handleLineChartToggle = () => {
    onChange({ lineChart: !lineChart });
  };

  // const mapOptionsToHandlers = {};
  // mapOptionsToHandlers[]

  return (
    <div className="Options-container">
      {optionsToRender.map(type => {
        // TODO: This is a naive solution. Find best way to
        // pass onChange functions instead of generating
        // components with all possible functions.
        return (
          <OptionFactory
            key={type}
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
