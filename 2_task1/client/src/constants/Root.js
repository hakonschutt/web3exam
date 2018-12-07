import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import createAppStore from "./createAppStore";

/**
 * Root provider for application, will init a new redux provider
 */

const Root = ({ children, store = createAppStore() }) => {
  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.any,
  store: PropTypes.func
};

export default Root;
