import React from "react";
import { SCATTER_PLOT, BAR_GRAPH } from "../../constants";
import "./index.css";
import ScatterPlot from "./ScatterPlot";
import BarGraph from "./BarGraph";

const VISUALIZATION_COMPONENTS = {};
VISUALIZATION_COMPONENTS[SCATTER_PLOT] = ScatterPlot;
VISUALIZATION_COMPONENTS[BAR_GRAPH] = BarGraph;

const Graphic = props => {
  const { visualizationChoice, data, options } = props;
  const VisualizationComponent = VISUALIZATION_COMPONENTS[visualizationChoice];
  return <VisualizationComponent data={data} options={options} />;
};

export default Graphic;
