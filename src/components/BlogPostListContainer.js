import React from "react";
import BlogPostList from "./BlogPostList";
import {
  blogPostListFetch,
  blogPosAdd,
  setPostListPage,
} from "../actions/actions";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import Message from "./Message";
import Paginator from "./Paginator";

const mapStateToProps = (state) => ({
  ...state.blogPostList,
});

const mapDispatchToPos = {
  blogPosAdd,
  blogPostListFetch,
  setPostListPage,
};

class BlogPostListContainer extends React.Component {
  componentDidMount() {
    const p = this.getQueryParamPage();
    if (p != this.props.currentPage) {
      this.props.setPostListPage(p);
    }
    this.props.blogPostListFetch(p);
  }
  componentDidUpdate(prevProp) {
    let prevPage = prevProp.match.params.page;
    if (prevPage) {
      prevPage = Number(prevPage);
    }
    //console.log("prev", prevPage);
    //console.log("actual", this.getQueryParamPage());
    if (prevPage && prevPage !== this.getQueryParamPage()) {
      console.log("prev", prevPage);
      console.log("actual", this.getQueryParamPage());
      this.props.setPostListPage(this.getQueryParamPage());
    }
    if (prevProp.currentPage !== this.props.currentPage) {
      this.props.blogPostListFetch(this.props.currentPage);
    }
  }

  getQueryParamPage() {
    return Number(this.props.match.params.page) || 1;
  }

  changePage = (page) => {
    this.props.setPostListPage(page);
    this.props.history.push(`/${page}`);
  };

  onNextPage = () => {
    let p = this.props.currentPage;
    p = Math.min(p + 1, this.props.pageCount);
    this.changePage(p);
  };

  onPrevPage = () => {
    let p = this.props.currentPage;
    p = Math.max(p - 1, 1);
    this.changePage(p);
  };
  render() {
    const { posts, loading } = this.props;
    if (loading == true) {
      return <Spinner />;
    }
    if (posts == null || posts.lenght === 0) {
      return <Message message={"No blogs"} />;
    }
    return (
      <div>
        <BlogPostList posts={posts} />
        <Paginator
          currentPage={this.props.currentPage}
          pageCount={this.props.pageCount}
          setPage={this.changePage}
          nextPage={this.onNextPage}
          prevPage={this.onPrevPage}
        ></Paginator>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToPos
)(BlogPostListContainer);
