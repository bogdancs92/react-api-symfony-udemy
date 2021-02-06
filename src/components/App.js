import React from "react";
import { Route, Switch } from "react-router";
import BlogPostListContainer from "./BlogPostListContainer";
import Header from "./Header";
import LoginForm from "./LoginForm";
import BlogPostContainer from "./BlogPostContainer";
import { connect } from "react-redux";
import { requests } from "../agent";
import { fetchUserProfile, setUserID, userLogout } from "../actions/actions";
import RegisterForm from "./RegisterForm";
import BlogPostForm from "./BlogPostForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem("token");
    if (token) {
      requests.setToken(token);
    }
  }
  componentDidMount() {
    const userID = window.localStorage.getItem("id");
    console.log("userID", userID);
    if (userID) {
      this.props.setUserID(userID * 1);
    }
  }
  componentDidUpdate(prevProp) {
    if (
      prevProp.auth.id !== this.props.auth.id &&
      this.props.auth.id !== null
    ) {
      //console.log("get user data", this.props.auth.id);
      this.props.fetchUserProfile(this.props.auth.id);
    }
  }
  render() {
    //console.log(this.props.auth.isAuthenticated);
    return (
      <div>
        <Header
          isAuthenticated={this.props.auth.isAuthenticated}
          userData={this.props.auth.userData}
          userLogout={this.props.userLogout}
        />
        <Switch>
          <Route path="/blog-post/:id" component={BlogPostContainer} />
          <Route path="/login" component={LoginForm} />
          <Route path="/blog-post-form" component={BlogPostForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/:page?" component={BlogPostListContainer} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("actual state", state);
  return { ...state };
};
const mapDispatchToPos = {
  fetchUserProfile,
  setUserID,
  userLogout,
};
export default connect(mapStateToProps, mapDispatchToPos)(App);
