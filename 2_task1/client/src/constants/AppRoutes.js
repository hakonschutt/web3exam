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

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <AppWrapper>
          <Switch>
            <Route
              exact
              path="/"
              component={loadablePage(() =>
                import("../containers/LandingPage")
              )}
            />
            <Route
              path="/404"
              component={loadablePage(() =>
                import("../containers/NotFoundPage")
              )}
            />
            <Redirect to="/404" />
          </Switch>
        </AppWrapper>
      </Router>
    );
  }
}

export default connect(null)(AppRoutes);
