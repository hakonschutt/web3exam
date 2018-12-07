import React from "react";

/**
 * Static case table header
 */
const CaseTableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">People</th>
        <th scope="col">Solved</th>
        <th scope="col">View</th>
        <th scope="col">Edit</th>
      </tr>
    </thead>
  );
};

export default CaseTableHeader;
