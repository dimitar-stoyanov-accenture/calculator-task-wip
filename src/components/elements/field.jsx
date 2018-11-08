import React, { Component } from "react";
import PropTypes from "prop-types";

class InputField extends Component {
  constructor() {
    super();
    this.change = this.change.bind(this);
  }
  change(e) {
    let val = Number(e.target.value);
    if (isNaN(val)) val = 0;
    this.props.onChange(val);
  }
  render() {
    let { value, className, readOnly } = this.props;
    return (
      <div className={className}>
        <input
          readOnly={readOnly}
          type="text"
          onChange={this.change}
          value={value}
        />
      </div>
    );
  }
}
InputField.propTypes = {
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.number
};

export default InputField;
