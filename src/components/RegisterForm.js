import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../form";

class RegisterForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="card mt-3 mb-6 " shadow-sm>
        <div className="card-body">
          <form>
            <Field
              name="username"
              label="Username"
              type="text"
              component={renderField}
            ></Field>
            <Field
              name="email"
              label="Email"
              type="text"
              component={renderField}
            ></Field>
            <Field
              name="password"
              label="Password"
              type="password"
              component={renderField}
            ></Field>
            <Field
              name="password"
              label="Retype Password"
              type="password"
              component={renderField}
            ></Field>
            <button type="submit" className="btn btn-primary btn-big btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default reduxForm({ form: "RegisterForm" })(RegisterForm);
