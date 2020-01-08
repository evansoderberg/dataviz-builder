import React from "react";
import CSVReader from "react-csv-reader";
import "./reader.css";

const PARSER_OPTIONS = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true
};

const cleanData = ({ data, errors, meta }) => {
  return data;
};

const Reader = props => {
  const { mergeOptions, setData } = props;

  const onCSVData = data => {
    // For the time being, we're assuming there are at least
    // two keys per line in the csv.
    const cleaned = cleanData(data);
    const dataKeys = Object.keys(cleaned[0]);
    mergeOptions({
      xAxis: dataKeys[0],
      yAxis: dataKeys[1]
    });
    setData(cleaned);
  };

  return (
    <div>
      <CSVReader
        cssClass="react-csv-input"
        label="Select a CSV File"
        onFileLoaded={onCSVData}
        parserOptions={PARSER_OPTIONS}
      />
      <a
        className="sample-data"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/evansoderberg/dataviz-builder/tree/master/data"
      >
        Click here for sample data sources
      </a>
    </div>
  );
};

export default Reader;
