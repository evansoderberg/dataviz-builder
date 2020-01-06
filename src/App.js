import React, { useState } from "react";
import "./App.css";
import CSVReader from "./components/csv/reader";
import DataOptions from "./components/data-options";
import { LineChart, ScatterPlot } from "./components/visualizations";

import { Provider, useSelector, useDispatch } from "react-redux";

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
      {/* <LineChart data={data} xAxis={xAxis} yAxis={yAxis} /> */}
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
