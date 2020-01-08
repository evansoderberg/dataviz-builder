import React, { useState } from "react";
import "./App.css";
import CSVReader from "./components/csv/reader";
import DataOptions from "./components/data-options";
import ScatterPlot from "./components/visualizations/ScatterPlot";
import BarGraph from "./components/visualizations/BarGraph";
import GraphicChoices from "./components/graphic-options";
import { SCATTER_PLOT, BAR_GRAPH } from "./components/visualizations/constants";

const VISUALIZATION_COMPONENTS = {};
VISUALIZATION_COMPONENTS[SCATTER_PLOT] = ScatterPlot;
VISUALIZATION_COMPONENTS[BAR_GRAPH] = BarGraph;

const Graphic = props => {
  const { graphicChoice, data, options } = props;
  const VisualizationComponent = VISUALIZATION_COMPONENTS[graphicChoice];
  return <VisualizationComponent data={data} options={options} />;
};

const App = () => {
  const [graphicChoice, setGraphicChoice] = useState(SCATTER_PLOT);
  const [visualizationOptions, setOptions] = useState(null);
  const [data, setData] = useState(null);

  const mergeOptions = options => {
    const newOptions = {
      ...visualizationOptions,
      ...options
    };
    setOptions(newOptions);
  };

  return (
    <div className="App">
      <CSVReader setData={setData} mergeOptions={mergeOptions} />
      <GraphicChoices
        graphicChoice={graphicChoice}
        setGraphicChoice={setGraphicChoice}
      />
      {data ? (
        <div className="Viz-and-opts">
          <DataOptions
            data={data}
            graphicChoice={graphicChoice}
            onChange={mergeOptions}
            options={visualizationOptions}
          />
          <Graphic
            data={data}
            graphicChoice={graphicChoice}
            options={visualizationOptions}
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;
