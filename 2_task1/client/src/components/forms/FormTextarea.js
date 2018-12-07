import React from "react";
import PropTypes from "prop-types";

/**
 * Single form textarea
 */
const FormTextarea = ({
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
      <textarea
        className={`form-control ${isFaulty ? "is-invalid" : ""}`}
        rows="3"
        placeholder={placeholder}
        {...input}
      />
      {isFaulty && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

FormTextarea.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string
};

export default FormTextarea;
