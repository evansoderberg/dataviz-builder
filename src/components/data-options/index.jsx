import React, { useContext, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

const Options = () => {
  const xAxis = useSelector(state => state.xAxis);
  const yAxis = useSelector(state => state.yAxis);
  const dispatch = useDispatch();

  const data = useSelector(state => state.cleanedData);

  if (!data || !data.length) return null;
  const dataKeys = Object.keys(data[0]);

  const handleXChange = event => {
    dispatch({ type: "SET_X_AXIS", value: event.target.value });
  };

  const handleYChange = event => {
    dispatch({ type: "SET_Y_AXIS", value: event.target.value });
  };

  return (
    <div>
      <label>
        X Axis:
        <select value={xAxis} onChange={handleXChange}>
          {dataKeys.map(val => {
            return (
              <option key={`x-${val}`} value={val}>
                {val}
              </option>
            );
          })}
        </select>
      </label>
      <br />
      <label>
        Y Axis:
        <select value={yAxis} onChange={handleYChange}>
          {dataKeys.map(val => {
            return (
              <option key={`y-${val}`} value={val}>
                {val}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};

export default Options;
