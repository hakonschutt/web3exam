import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Alert,
  Jumbotron,
  PageContext,
  CaseTableHeader,
  CaseTableItem,
  Breadcrumb
} from "../components";
import { fetchCases } from "../actions";

const breadcrumbConfig = [{ active: false, to: "/", title: "Cases" }];

/**
 * Cases component for displaying all cases
 */
class Cases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ""
    };
  }

  /**
   * Fetches all cases when component did finish rendering
   */

  componentDidMount() {
    this.props.fetchCases((gotError, msg) => {
      if (gotError) {
        this.setState({ error: msg });
      }
    });
  }

  /**
   * Init of JSX
   */

  render() {
    return (
      <PageContext>
        <Breadcrumb args={breadcrumbConfig} />
        <Jumbotron header="Cases" />
        <section className="cases-table">
          <div className="container">
            <Alert msg={this.state.error} />
            <table className="table">
              <CaseTableHeader />
              <tbody>
                {this.props.cases.map((el, i) => (
                  <CaseTableItem key={el.id} index={i + 1} {...el} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </PageContext>
    );
  }
}

/**
 * Maps redux state to component props
 */
function mapStateToProps({ cases }) {
  return { cases };
}

export default connect(
  mapStateToProps,
  { fetchCases }
)(Cases);
