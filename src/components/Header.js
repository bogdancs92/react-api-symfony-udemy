import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    const name = this.props.userData ? this.props.userData.name : "";
    return (
      <nav className="navbar navbar-expand-lg  navvabr-light bg-light">
        <Link to="/" className="navbar-brand">
          React Blog
        </Link>
        <span className="navbar-text">
          {isAuthenticated ? (
            <div>
              Welcome {name}
              <a
                className="nav-link"
                href="# "
                onClick={() => {
                  this.props.userLogout();
                }}
              >
                Logout
              </a>
              <Link to="/blog-post-form">New item</Link>
            </div>
          ) : (
            <Fragment>
              <ul className="navbar-nav r-auto"></ul>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </Fragment>
          )}
        </span>
      </nav>
    );
  }
}
