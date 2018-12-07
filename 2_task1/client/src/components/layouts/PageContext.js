import React from "react";
import PropTypes from "prop-types";

const PageContext = ({ children }) => {
  return (
    <div className="page-wrap" style={{ minHeight: "calc(100vh - 200px)" }}>
      {children}
    </div>
  );
};

PageContext.propTypes = {
  children: PropTypes.any
};

export default PageContext;
