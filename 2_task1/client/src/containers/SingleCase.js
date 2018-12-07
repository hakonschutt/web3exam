import React, { Component } from "react";
import { Jumbotron, PageContext, Breadcrumb } from "../components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      }
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

  render() {
    const { id } = this.props.match.params;
    const { data, breadcrumb } = this.state;

    console.log(data);

    return (
      <PageContext>
        <Breadcrumb args={breadcrumb} />
        <Jumbotron header={data.title} lead={data.description} />
        <div className="container">
          <h2 className="py-2">People</h2>
          <ul className="list-group list-group-flush my-2">
            {data.persons.map(per => (
              <li className="list-group-item">{per}</li>
            ))}
          </ul>
          <Link
            to={`/case/${id}/edit`}
            class="btn btn-primary btn-lg btn-block my-3"
          >
            Edit
          </Link>
        </div>
      </PageContext>
    );
  }
}

function mapStateToProps({ cases }) {
  return { cases };
}

export default connect(mapStateToProps)(SingleCase);
