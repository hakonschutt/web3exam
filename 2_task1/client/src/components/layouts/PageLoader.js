import React from "react";
import { PacmanLoader } from "react-spinners";
import PropTypes from "prop-types";

const PageLoader = ({ color }) => {
  return (
    <div className="h-100 row align-items-center">
      <div className="col">
        <PacmanLoader className="loader" color={color} loading={true} />
      </div>
    </div>
  );
};

PageLoader.propTypes = {
  color: PropTypes.string
};

PageLoader.defaultProps = {
  color: "#f05f50"
};

export default PageLoader;
