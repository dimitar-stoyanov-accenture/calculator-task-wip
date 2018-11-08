import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import MemoryCalculator from "./components/memory-calculator.jsx";

import Operation from "./model/operation";

import "./styles.css";

let operations = [
  new Operation("+", "Sum", (left, right) => left + right),
  new Operation("-", "Diff", (left, right) => left - right),
  new Operation("*", "Mult", (left, right) => left * right),
  new Operation("/", "Sum", (left, right) => left / right)
  // new Operation("^", "^", (left, right) => Math.pow(left, right))
];

function App() {
  return (
    <div className="App">
      <MemoryCalculator operations={operations} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
