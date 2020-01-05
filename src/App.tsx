import React, { useState } from "react";
import "./App.css";
import CSVReader from "./components/csv/reader";
import DataOptions from "./components/data-options";
import Visualization from "./components/visualizations";

import { Provider, useSelector, useDispatch } from "react-redux";

import { createStore } from "redux";

const rootReducer = (state = { xAxis: null, yAxis: null }, action: any) => {
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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <CSVReader />
        <DataOptions />
        <Visualization />
      </div>
    </Provider>
  );
};

export default App;
