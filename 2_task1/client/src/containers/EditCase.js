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
      options: [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" }
      ]
    }
  }
];

class EditCase extends Component {
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

    this.setState({
      breadcrumb: [
        { active: true, to: "/", title: "Cases" },
        { active: true, to: `/case/${id}`, title: id },
        { active: false, to: `/case/${id}/edit`, title: "Edit" }
      ]
    });
  }

  async onSubmit(fields) {
    console.log(fields);
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
})(EditCase);
