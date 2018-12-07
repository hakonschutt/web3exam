import React, { Component } from "react";
import { Field } from "redux-form";
import PropTypes from "prop-types";

import { FormField, Selector, Alert, FormTextarea } from "..";

/**
 * Builds form based of a config array
 */
class FormBuilder extends Component {
  /**
   * Call props componentMount function
   */
  componentDidMount() {
    if (typeof this.props.componentMount === "function") {
      this.props.componentMount();
    }
  }

  /**
   * Render single config item (Field)
   */
  renderFields() {
    const { formFields } = this.props;

    return formFields.map(({ name, label, type, input, extraProps }) => {
      let Comp = null;

      switch (input) {
        case "textarea":
          Comp = FormTextarea;
          break;
        case "select":
          Comp = Selector;
          break;
        default:
          Comp = FormField;
      }
      return (
        <Field
          key={name}
          label={label}
          type={type}
          name={name}
          component={Comp}
          extraProps={extraProps}
        />
      );
    });
  }

  /**
   * Init JSX
   */
  render() {
    const { onSubmit, error } = this.props;

    return (
      <div className="form-wrap">
        <Alert msg={error} />
        <form onSubmit={onSubmit}>
          {this.renderFields()}
          <div className="form-group my-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

FormBuilder.propTypes = {
  error: PropTypes.string,
  componentMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  formFields: PropTypes.array.isRequired
};

export default FormBuilder;
