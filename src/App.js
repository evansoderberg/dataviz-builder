import React from "react";
import "./App.css";
import CSVReader from "./components/csv/reader";
import DataOptions from "./components/data-options";
import { ScatterPlot } from "./components/visualizations";

import { Provider, useSelector } from "react-redux";

import { createStore } from "redux";

const rootReducer = (state = { xAxis: null, yAxis: null }, action) => {
  switch (action.type) {
    case "SET_X_AXIS":
      return { ...state, xAxis: action.value };
    case "SET_Y_AXIS":
      return { ...state, yAxis: action.value };
    case "SET_CLEANED_DATA":
      return { ...state, cleanedData: action.value };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

const AppInner = () => {
  const data = useSelector(state => state.cleanedData);
  const xAxis = useSelector(state => state.xAxis);
  const yAxis = useSelector(state => state.yAxis);
  return (
    <div className="App">
      <CSVReader />
      <DataOptions />
      <ScatterPlot data={data} xAxis={xAxis} yAxis={yAxis} />
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
