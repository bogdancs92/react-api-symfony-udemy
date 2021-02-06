import React, { Fragment } from "react";
import { connect } from "react-redux";
import { blogPostFetch, blogPostUnload } from "../actions/actions";
import BlogPost from "./BlogPost";
import CommentairesForm from "./CommentairesForm";
import Spinner from "./Spinner";

class BlogPostContainer extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.blogPostFetch(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.blogPostUnload();
  }
  render() {
    //console.log(this.props);
    const { currentBlogPost, loading } = this.props;
    if (loading == true) {
      return <Spinner />;
    }
    if (currentBlogPost) {
      return (
        <Fragment>
          {" "}
          <BlogPost post={currentBlogPost} />
          {this.props.isAuthenticated && (
            <CommentairesForm postid={this.props.match.params.id} />
          )}
        </Fragment>
      );
    }
    return <div>Hello from BlogPost</div>;
  }
}

const mapStateToProps = (state) => ({
  ...state.blogPostList,
  ...state.auth,
});

const mapDispatchToPos = {
  blogPostFetch,
  blogPostUnload,
};

export default connect(mapStateToProps, mapDispatchToPos)(BlogPostContainer);
