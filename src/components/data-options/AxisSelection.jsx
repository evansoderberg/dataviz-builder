import React from "react";
import "./index.css";

const AxisSelection = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map(val => {
          return (
            <option key={`label-${val}`} value={val}>
              {val}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default AxisSelection;
