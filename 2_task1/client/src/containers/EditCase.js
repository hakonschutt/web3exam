import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import { Jumbotron, PageContext, FormBuilder, Breadcrumb } from "../components";
import { formValidation } from "../utils/form";
import { updateCase } from "../actions";

const formFields = [
  {
    label: "Title",
    type: "text",
    input: "text",
    name: "title",
    error: "Need to include a title"
  },
  {
    label: "Description",
    type: "text",
    input: "textarea",
    name: "description",
    error: "Need to include a description"
  },
  {
    label: "Solved",
    type: "text",
    input: "select",
    name: "isSolved",
    error: "Need to include a solved flag",
    extraProps: {
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" }
      ]
    }
  }
];

class EditCase extends Component {
  state = {
    breadcrumb: [],
    data: {
      title: "",
      description: "",
      persons: [],
      isSolved: null
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      breadcrumb: [
        { active: true, to: "/", title: "Cases" },
        { active: true, to: `/case/${id}`, title: id },
        { active: false, to: `/case/${id}/edit`, title: "Edit" }
      ]
    });
  }

  async onSubmit(fields) {
    const { id } = this.props.match.params;

    const data = {
      ...fields,
      isSolved: fields.isSolved.value,
      persons: []
    };

    this.props.updateCase(id, data, (gotError, msg, id) => {
      if (gotError) {
        this.setState({ error: msg });
      } else {
        this.props.history.push(`/case/${id}`);
      }
    });
  }

  componentMount() {
    const { id } = this.props.match.params;
    const { cases } = this.props;

    const c = cases.find(cur => {
      return cur.id === id;
    });

    this.props.initialize({
      ...c,
      isSolved: { value: c.isSolved, label: c.isSolved ? "Yes" : "No" }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { breadcrumb } = this.state;

    return (
      <PageContext>
        <Breadcrumb args={breadcrumb} />
        <Jumbotron header="Edit case" />
        <section className="container">
          <FormBuilder
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            error={""}
            formFields={formFields}
            componentMount={this.componentMount.bind(this)}
          />
        </section>
      </PageContext>
    );
  }
}

function validate(values) {
  return formValidation(values, formFields);
}

function mapStateToProps({ cases }) {
  return { cases };
}

export default reduxForm({
  validate,
  form: "editCaseForm"
})(
  connect(
    mapStateToProps,
    { updateCase }
  )(withRouter(EditCase))
);
