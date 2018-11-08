import React, { Component } from "react";
import PropTypes from "prop-types";
import Operation from "../../model/operation";

class OperationSelector extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }
  select() {
    this.props.onSelect(this.props.operation);
  }
  render() {
    let { operation, isSelected } = this.props;
    let className = null;
    if (isSelected) {
      className = "selected";
    }
    return (
      <li onClick={this.select} className={className}>
        {operation.symbol}
      </li>
    );
  }
}
OperationSelector.propTypes = {
  operation: PropTypes.instanceOf(Operation),
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func
};

class OperationsSelector extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }
  select(operation) {
    if (operation.symbol != this.props.selected.symbol) {
      this.props.onChange(operation);
    }
  }
  render() {
    let { className } = this.props;
    let operationItems = this.props.operations.map(operation => {
      return (
        <OperationSelector
          key={operation.symbol}
          onSelect={this.select}
          operation={operation}
          isSelected={
            operation.symbol == this.props.selected.symbol ? true : false
          }
        />
      );
    });
    return <ul className={className}>{operationItems}</ul>;
  }
}
OperationsSelector.propTypes = {
  operations: PropTypes.arrayOf(PropTypes.instanceOf(Operation)),
  selected: PropTypes.instanceOf(Operation),
  onChange: PropTypes.func,
  className: PropTypes.string
};

export default OperationsSelector;
export { OperationSelector };
