import React, { Component } from "react";
import { Jumbotron, PageContext, Breadcrumb } from "../components";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { deleteCase } from "../actions";
import { Alert } from "../components";

class SingleCase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breadcrumb: [],
      data: {
        title: "",
        description: "",
        persons: [],
        isSolved: null
      },
      error: "hmmmm"
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    const data = this.props.cases.find(el => el.id === id);

    this.setState({
      breadcrumb: [
        { active: true, to: "/", title: "Cases" },
        { active: false, to: `/case/${id}`, title: id }
      ],
      data: data ? data : this.state.data
    });
  }

  deleteCase() {
    const { id } = this.props.match.params;

    console.log("GOT HERE");

    this.props.deleteCase(id, (gotError, msg) => {
      console.log(gotError, msg);
      if (gotError) {
        this.setState({ error: msg });
      } else {
        this.props.history.push("/");
      }
    });
  }

  render() {
    const { id } = this.props.match.params;
    const { data, breadcrumb, error } = this.state;

    return (
      <PageContext>
        <Breadcrumb args={breadcrumb} />
        <Jumbotron header={data.title} lead={data.description} />
        <div className="container">
          <Alert error={error} />
          <h4>Solved: {data.isSolved ? "Yes" : "No"}</h4>
          <h2 className="py-2">People</h2>
          <ul className="list-group list-group-flush my-2">
            {data.persons.map(per => (
              <li className="list-group-item">{per}</li>
            ))}
          </ul>
          <div className="my-3">
            <Link
              to={`/case/${id}/edit`}
              className="btn btn-primary btn-lg mx-2"
            >
              Edit
            </Link>
            <a
              onClick={this.deleteCase.bind(this)}
              className="btn btn-danger btn-lg mx-2"
              href="#0"
            >
              Delete
            </a>
          </div>
        </div>
      </PageContext>
    );
  }
}

function mapStateToProps({ cases }) {
  return { cases };
}

export default connect(
  mapStateToProps,
  { deleteCase }
)(withRouter(SingleCase));
