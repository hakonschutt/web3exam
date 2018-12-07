import React from "react";
import PropTypes from "prop-types";

const Jumbotron = ({ header, lead }) => {
  return (
    <section className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{header}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
};

Jumbotron.propTypes = {
  header: PropTypes.string,
  lead: PropTypes.string
};

Jumbotron.defaultProps = {
  header: "",
  lead: ""
};

export default Jumbotron;
