import React from "react";
import PropTypes from "prop-types";

const FormField = ({
  input,
  type,
  label,
  placeholder,
  meta: { error, touched }
}) => {
  const isFaulty = touched && error;

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        className={`form-control ${isFaulty ? "is-invalid" : ""}`}
        placeholder={placeholder}
        {...input}
      />
      {isFaulty && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

FormField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string
};

export default FormField;
