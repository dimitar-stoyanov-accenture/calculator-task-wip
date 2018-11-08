import React, { Component } from "react";
import PropTypes from "prop-types";
import OperationsSelector from "./operations.jsx";
import Calculation from "./calculation.jsx";
import InputField from "../elements/field.jsx";
import Operation from "../../model/operation";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 1,
      right: 2,
      operation: this.props.defaultOperation,
      result: 0
    };
    this.changeLeft = this.changeLeft.bind(this);
    this.changeRight = this.changeRight.bind(this);
    this.operationChange = this.operationChange.bind(this);
    this.calculated = this.calculated.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.defaultLeft !== this.props.defaultLeft ||
      prevProps.defaultRight !== this.props.defaultRight ||
      prevProps.defaultOperation.symbol !== this.props.defaultOperation.symbol
    ) {
      this.setState({
        left: this.props.defaultLeft,
        right: this.props.defaultRight,
        operation: this.props.defaultOperation
      });
    }
  }

  operationChange(operation) {
    this.setState({ operation: operation });
  }
  changeLeft(left) {
    this.setState({ left });
  }
  changeRight(right) {
    this.setState({ right });
  }
  calculated(result) {
    this.setState({ result: result }, () => {
      let { onCalculated } = this.props;
      let { left, right, operation, result } = this.state;
      if (onCalculated) {
        onCalculated(left, right, operation, result);
      }
    });
  }
  render() {
    let { left, right, operation } = this.state;
    return (
      <div>
        <InputField
          onChange={this.changeLeft}
          value={left}
          className="input-field"
        />
        <OperationsSelector
          className="operations-selector"
          operations={this.props.operations}
          selected={operation}
          onChange={this.operationChange}
        />
        <InputField
          onChange={this.changeRight}
          value={right}
          className="input-field"
        />
        <Calculation
          left={left}
          right={right}
          operation={operation}
          onCalculated={this.calculated}
        />
      </div>
    );
  }
}
Calculator.propTypes = {
  operations: PropTypes.arrayOf(PropTypes.instanceOf(Operation))
};
export default Calculator;
