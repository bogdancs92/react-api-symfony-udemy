import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { post } = this.props;
    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <div>{post.content}</div>

          <p className="card-text border-top">
            <small className="text-muted">
              <TimeAgo datetime={post.published} locale={"fr"} />
            </small>
          </p>
        </div>
      </div>
    );
  }
}
export default BlogPost;
