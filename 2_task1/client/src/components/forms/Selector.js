import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

class Selector extends Component {
  handleChange(value) {
    const {
      input: { onChange }
    } = this.props;

    console.log(value);

    onChange(value);
  }

  render() {
    const {
      meta: { error, touched },
      input,
      label,
      placeholder,
      extraProps
    } = this.props;

    const isFaulty = touched && error;
    console.log(input.value);

    return (
      <div className="form-group">
        <label>{label}</label>
        <Select
          className={isFaulty ? "is-invalid" : ""}
          placeholder={placeholder}
          value={input.value}
          onChange={this.handleChange.bind(this)}
          isClearable={true}
          options={extraProps.options}
          {...input}
        />
        {isFaulty && (
          <div className="invalid-feedback" style={{ display: "block" }}>
            {error}
          </div>
        )}
      </div>
    );
  }
}

Selector.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  extraProps: PropTypes.any
};

export default Selector;
