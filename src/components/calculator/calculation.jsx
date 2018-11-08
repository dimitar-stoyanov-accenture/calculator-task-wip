import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Operation from "../../model/operation";

import InputField from "../elements/field.jsx";

class Calculation extends Component {
  constructor(props) {
    super(props);

    let state = this.calculate();
    this.state = state;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.right != prevProps.right ||
      this.props.left != prevProps.left ||
      this.props.operation != prevProps.operation
    ) {
      let result = this.calculate();
      if (result) {
        this.setState(result);
      }
    }
  }
  calculate() {
    let { operation, left, right } = this.props;
    left = Number(left);
    right = Number(right);
    let result = operation.calc(left, right);
    this.props.onCalculated(result);
    return { result: result };
  }
  render() {
    return (
      <Fragment>
        <div className="equals-result">=</div>
        <InputField
          className="input-field-result"
          value={this.state.result}
          readOnly={true}
        />
      </Fragment>
    );
  }
}
Calculation.propTypes = {
  operation: PropTypes.instanceOf(Operation),
  left: PropTypes.oneOf(PropTypes.number, PropTypes.string),
  right: PropTypes.oneOf(PropTypes.number, PropTypes.string)
};

export default Calculation;
