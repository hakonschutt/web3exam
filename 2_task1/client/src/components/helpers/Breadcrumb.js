import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Breadcrumb = ({ args }) => {
  return (
    <section className="bg-light">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light mb-0">
            {args.map(arg => {
              return arg.active ? (
                <li
                  key={arg.title}
                  className="breadcrumb-item active"
                  aria-current="page"
                >
                  <Link to={arg.to}>{arg.title}</Link>
                </li>
              ) : (
                <li key={arg.title} className="breadcrumb-item">
                  {arg.title}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
};

Breadcrumb.propTypes = {
  args: PropTypes.array
};

export default Breadcrumb;
