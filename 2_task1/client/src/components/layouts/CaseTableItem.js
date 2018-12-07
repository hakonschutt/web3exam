import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CaseTableItem = ({ index, id, title, persons, isSolved }) => {
  return (
    <tr>
      <th scope="col">{index}</th>
      <th scope="col">{title}</th>
      <th scope="col">{persons.length}</th>
      <th scope="col">{isSolved ? "Yes" : "No"}</th>
      <th scope="col">
        <Link to={`/case/${id}`}>View</Link>
      </th>
    </tr>
  );
};

CaseTableItem.propTypes = {
  index: PropTypes.any,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  persons: PropTypes.array.isRequired,
  isSolved: PropTypes.bool.isRequired
};

export default CaseTableItem;
