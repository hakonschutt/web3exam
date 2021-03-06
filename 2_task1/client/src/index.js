import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./constants/Root";
import AppRoutes from "./constants/AppRoutes";

/**
 * Render of application
 */
ReactDOM.render(
  <Root>
    <AppRoutes />
  </Root>,
  document.getElementById("root")
);
