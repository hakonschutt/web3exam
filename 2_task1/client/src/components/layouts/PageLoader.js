import React from "react";
import { PacmanLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <div className="h-100 row align-items-center">
      <div className="col">
        <PacmanLoader className="loader" color="#f05f50" loading={true} />
      </div>
    </div>
  );
};

export default PageLoader;
