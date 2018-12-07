import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Jumbotron, PageContext, FormBuilder, Breadcrumb } from "../components";
import { formValidation } from "../utils/form";

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
  async onSubmit(fields) {
    console.log(fields);
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
            error={""}
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
})(NewCase);
