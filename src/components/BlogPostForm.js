import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../form";
import { connect } from "react-redux";
import { canWriteBlogPost } from "../apiUtils";
import { Redirect } from "react-router";
import { postNewBog, imageDelete } from "../actions/actions";
import ImageUpload from "./ImageUpload";
import ImageBrowser from "./ImageBrowser";

class BlogPostForm extends Component {
  render() {
    const onSubmit = (values) => {
      console.log("submitting", values);
      this.props.postNewBog(values.content, values.title, this.props.images);
    };
    const { submitting, handleSubmit } = this.props;
    if (!canWriteBlogPost(this.props.userData)) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          Create a new Blog Post
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              name="title"
              label="Title"
              type="text"
              component={renderField}
            ></Field>
            <Field
              name="content"
              label="Content"
              type="textarea"
              component={renderField}
            ></Field>
            <ImageUpload />
            <ImageBrowser
              images={this.props.images}
              delete={this.props.imageDelete}
            />
            <button
              type="submit"
              className="btn btn-primary btn-big btn-block"
              disabled={submitting || this.props.isSending}
            >
              Add post
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToPos = {
  postNewBog,
  imageDelete,
};
const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.blogPostForm,
});
export default reduxForm({
  form: "BlogPostForm",
})(connect(mapStateToProps, mapDispatchToPos)(BlogPostForm));
