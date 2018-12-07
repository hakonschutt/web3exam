import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { loadablePage } from "../hocs";
import AppWrapper from "./AppWrapper";

/**
 * Init of applications routes with react-router
 */
class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <AppWrapper>
          <Switch>
            <Route
              exact
              path="/"
              component={loadablePage(() => import("../containers/Cases"))}
            />
            <Route
              exact
              path="/case/new"
              component={loadablePage(() => import("../containers/NewCase"))}
            />
            <Route
              exact
              path="/case/:id"
              component={loadablePage(() => import("../containers/SingleCase"))}
            />
            <Route
              exact
              path="/case/:id/edit"
              component={loadablePage(() => import("../containers/EditCase"))}
            />
            <Route
              path="/404"
              component={loadablePage(() => import("../containers/NotFound"))}
            />
            <Redirect to="/404" />
          </Switch>
        </AppWrapper>
      </Router>
    );
  }
}

export default connect(null)(AppRoutes);
