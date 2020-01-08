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

const Options = ({ data, options, onChange }) => {
  const { xAxis, yAxis, lineChart } = options;

  const dataKeys = Object.keys(data[0]);

  const handleXChange = event => {
    onChange({ xAxis: event.target.value });
  };

  const handleYChange = event => {
    onChange({ yAxis: event.target.value });
  };

  const handleLineChartToggle = event => {
    onChange({ lineChart: !lineChart });
  };

  return (
    <div className="Options-container">
      <AxisSelection
        label="X Axis"
        value={xAxis}
        options={dataKeys}
        onChange={handleXChange}
      />
      <br />
      <AxisSelection
        label="Y Axis"
        value={yAxis}
        options={dataKeys}
        onChange={handleYChange}
      />
      <br />
      <label>
        Line Chart
        <input
          name="lineChart"
          type="checkbox"
          onChange={handleLineChartToggle}
        />
      </label>
    </div>
  );
};

export default Options;
