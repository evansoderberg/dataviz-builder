import React from "react";
import CSVReader from "react-csv-reader";

const handleData = data => console.log(data);

const PARSER_OPTIONS = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

const Reader = props => (
  <div className="container">
    <CSVReader
      cssClass="react-csv-input"
      label="Select CSV with header"
      onFileLoaded={handleData}
      parserOptions={PARSER_OPTIONS}
    />
    <p>and then open the console</p>
  </div>
);

export default Reader;
