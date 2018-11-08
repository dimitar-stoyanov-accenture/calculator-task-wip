import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import _ from "lodash";

import Calculator from "./calculator/calculator.jsx";

class HistoryEntry extends Component {
  constructor() {
    super();
    this.select = this.select.bind(this);
  }
  select() {
    this.props.onSelect(this.props.entry);
  }
  render() {
    let { entry } = this.props;
    return (
      <li onClick={this.select}>
        <span>{entry.left}</span>
        <span>{entry.operation.symbol}</span>
        <span>{entry.right}</span>
        <span>=</span>
        <span>{entry.result}</span>
      </li>
    );
  }
}
class HistoryEntries extends Component {
  constructor() {
    super();
    this.select = this.select.bind(this);
  }
  select(entry) {
    this.props.onSelect(entry);
  }
  render() {
    let historyEntries = this.props.entries.map((entry, key) => (
      <HistoryEntry key={key} entry={entry} onSelect={this.select} />
    ));
    if (historyEntries.length == 0) {
      historyEntries = (
        <li>
          <i>No history yet! Click "Save" button to add an entry.</i>
        </li>
      );
    }
    return (
      <div className="history-entries">
        <ul>{historyEntries}</ul>
      </div>
    );
  }
}

class MemoryCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {
        left: 1,
        right: 2,
        operation: props.operations[0]
      },
      lastCalculation: {},
      memory: []
    };
    this.calculated = this.calculated.bind(this);
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
  }
  calculated(left, right, operation, result) {
    this.setState({ lastCalculation: { left, right, operation, result } });
  }
  load(entry) {
    this.setState({ entry: entry });
  }
  save() {
    this.setState({
      memory: [this.state.lastCalculation, ...this.state.memory]
    });
  }
  render() {
    let canSave = !_.isEqual(this.state.lastCalculation, this.state.memory[0]);
    return (
      <div className="memory-calculator">
        <Calculator
          operations={this.props.operations}
          defaultLeft={this.state.entry.left}
          defaultRight={this.state.entry.right}
          defaultOperation={this.state.entry.operation}
          onCalculated={this.calculated}
        />
        <button className="save-button" onClick={this.save} disabled={!canSave}>
          Save
        </button>
        <HistoryEntries entries={this.state.memory} onSelect={this.load} />
      </div>
    );
  }
}
export default MemoryCalculator;
