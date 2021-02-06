import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { renderField } from "../form";
import { loginCheck } from "../actions/actions";

class LoginForm extends React.Component {
  componentDidUpdate(prevProp) {
    if (prevProp.token !== this.props.token) {
      this.props.history.push("/");
    }
  }
  render() {
    const { handleSubmit, error } = this.props;
    const onSubmit = (values) => {
      this.props.loginCheck(values.username, values.password);
    };
    return (
      <div className="text-center">
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="username"
            label="Username"
            type="text"
            value="bogdans@gmail.com"
            component={renderField}
          ></Field>
          <Field
            name="password"
            label="Password"
            type="password"
            value="Secret1."
            component={renderField}
          ></Field>
          <button type="submit" className="btn btn-primary btn-big btn-block">
            Login
          </button>
        </form>
      </div>
    );
  }
}
const mapDispatchToPos = {
  loginCheck,
};
const mapStateToProps = (state) => ({
  ...state.auth,
});
export default reduxForm({
  form: "LoginForm",
})(connect(mapStateToProps, mapDispatchToPos)(LoginForm));
