import React, { useState } from "react";
import "./App.css";
import CSVReader from "./components/csv/reader";
import DataOptions from "./components/data-options";
import Graphic from "./components/visualizations";
import VisualizationChoices from "./components/visualization-choices";
import { SCATTER_PLOT } from "./constants";

const App = () => {
  const [visualizationChoice, setVisualizationChoice] = useState(SCATTER_PLOT);
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
      <VisualizationChoices
        visualizationChoice={visualizationChoice}
        setVisualizationChoice={setVisualizationChoice}
      />
      {data ? (
        <div className="Viz-and-opts">
          <DataOptions
            data={data}
            visualizationChoice={visualizationChoice}
            onChange={mergeOptions}
            options={visualizationOptions}
          />
          <Graphic
            data={data}
            visualizationChoice={visualizationChoice}
            options={visualizationOptions}
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;
