import React from "react";
import CSVReader from "react-csv-reader";
import { useSelector, useDispatch } from "react-redux";
import "./reader.css";

const PARSER_OPTIONS = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true
};

const cleanData = ({ data, errors, meta }) => {
  return data;
};

const Reader = () => {
  const dispatch = useDispatch();

  const onCSVData = data => {
    const cleanedData = cleanData(data);
    const dataKeys = Object.keys(cleanedData[0]);
    dispatch({ type: "SET_X_AXIS", value: dataKeys[0] });
    dispatch({ type: "SET_Y_AXIS", value: dataKeys[1] });
    dispatch({ type: "SET_CLEANED_DATA", value: cleanedData });
  };

  return (
    <CSVReader
      cssClass="react-csv-input"
      label="Select a CSV File"
      onFileLoaded={onCSVData}
      parserOptions={PARSER_OPTIONS}
    />
  );
};

export default Reader;
