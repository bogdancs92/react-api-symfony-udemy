import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { renderField } from "../form";
import { postNewComment } from "../actions/actions";

class CommentairesForm extends Component {
  render() {
    //const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const { handleSubmit, submitting, postid } = this.props;
    const onSubmit = (values) => {
      //return sleep(2000).then(() => {
      //  throw new SubmissionError("Invalid comment");
      //});
      this.props.postNewComment(values.content, postid);
    };
    return (
      <div>
        <div className="card mb-3 mt-3 shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              {" "}
              <Field
                name="content"
                label="Type your comment: "
                type="texarea"
                component={renderField}
              >
                {" "}
              </Field>
              <button
                type="submit"
                className="btn btn-block btn-primary btn-big"
                disabled={submitting}
              >
                Add comment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToPos = {
  postNewComment,
};
const mapStateToProps = (state) => ({
  ...state.auth,
});
export default reduxForm({
  form: "LoginForm",
})(connect(mapStateToProps, mapDispatchToPos)(CommentairesForm));
