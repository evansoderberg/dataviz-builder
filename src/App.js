import React, { useState } from "react";
import "./App.css";
import CSVReader from "./components/csv/reader";
import DataOptions from "./components/data-options";
import ScatterPlot from "./components/visualizations/ScatterPlot";

const App = () => {
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
      {data ? (
        <div className="Viz-and-opts">
          <DataOptions
            data={data}
            onChange={mergeOptions}
            options={visualizationOptions}
          />
          <ScatterPlot data={data} options={visualizationOptions} />
        </div>
      ) : null}
    </div>
  );
};

export default App;
