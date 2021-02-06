import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { posts } = this.props;
    return (
      <ul>
        {posts &&
          posts.map((post, index) => {
            return (
              <div className="card mb-3 mt-3 shadow-sm" key={index}>
                <div className="card-body">
                  <h3>
                    <Link to={`/blog-post/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="card-text border-top">
                    <small className="text-muted">
                      <TimeAgo datetime={post.published} locale={"fr"} />
                    </small>
                  </p>
                </div>
              </div>
            );
          })}
      </ul>
    );
  }
}
export default BlogPostList;
