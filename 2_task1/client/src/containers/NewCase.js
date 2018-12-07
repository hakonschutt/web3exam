import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import { Jumbotron, PageContext, FormBuilder, Breadcrumb } from "../components";
import { formValidation } from "../utils/form";
import { uploadCase } from "../actions";

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
      options: [{ value: true, label: "Yes" }, { value: false, label: "No" }]
    }
  }
];

const breadcrumbConfig = [
  { active: true, to: "/", title: "Cases" },
  { active: false, to: "/case/new", title: "New" }
];

class NewCase extends Component {
  state = {
    error: ""
  };

  onSubmit(fields) {
    const data = {
      ...fields,
      isSolved: fields.isSolved.value,
      persons: []
    };

    this.props.uploadCase(data, (gotError, msg, id) => {
      if (gotError) {
        this.setState({ error: msg });
      } else {
        this.props.history.push(`/case/${id}`);
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <PageContext>
        <Breadcrumb args={breadcrumbConfig} />
        <Jumbotron header="New case" />
        <section className="container">
          <FormBuilder
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
            error={this.state.error}
            formFields={formFields}
          />
        </section>
      </PageContext>
    );
  }
}

function validate(values) {
  return formValidation(values, formFields);
}

export default reduxForm({
  validate,
  form: "newCaseForm"
})(
  connect(
    null,
    { uploadCase }
  )(withRouter(NewCase))
);
