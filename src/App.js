import React from "react";
import "./App.css";
import CSVReader from "./components/csv/reader";
import DataOptions from "./components/data-options";
import ScatterPlot from "./components/visualizations/ScatterPlot";
// import { ScatterPlot } from "./components/visualizations/d3-render";

import { Provider, useSelector } from "react-redux";

import { createStore } from "redux";

const rootReducer = (
  state = { xAxis: null, yAxis: null, lineChart: false, cleanedData: null },
  action
) => {
  switch (action.type) {
    case "SET_X_AXIS":
      return { ...state, xAxis: action.value };
    case "SET_Y_AXIS":
      return { ...state, yAxis: action.value };
    case "SET_CLEANED_DATA":
      return { ...state, cleanedData: action.value };
    case "TOGGLE_LINE_CHART":
      return { ...state, lineChart: !state.lineChart };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

const AppInner = () => {
  const data = useSelector(state => state.cleanedData);
  const xAxis = useSelector(state => state.xAxis);
  const yAxis = useSelector(state => state.yAxis);
  const lineChart = useSelector(state => state.lineChart);
  return (
    <div className="App">
      <CSVReader />
      {data ? (
        <div className="Viz-and-opts">
          <DataOptions />
          <ScatterPlot
            data={data}
            xAxis={xAxis}
            yAxis={yAxis}
            lineChart={lineChart}
          />
        </div>
      ) : null}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
};

export default App;
