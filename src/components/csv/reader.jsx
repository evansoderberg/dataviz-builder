import React from "react";
import CSVReader from "react-csv-reader";
import { useSelector, useDispatch } from "react-redux";

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
    <div className="container">
      <CSVReader
        cssClass="react-csv-input"
        label="Select CSV with header"
        onFileLoaded={onCSVData}
        parserOptions={PARSER_OPTIONS}
      />
    </div>
  );
};

export default Reader;
