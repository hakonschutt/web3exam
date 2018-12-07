import React from "react";
import PropTypes from "prop-types";

/**
 * Global Alert banner
 */
const Alert = ({ type, msg }) => {
  if (!msg) return null;

  return (
    <div className={`alert alert-${type}`} role="alert">
      {msg}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string,
  msg: PropTypes.string
};

Alert.defaultProps = {
  type: "danger",
  msg: ""
};

export default Alert;
