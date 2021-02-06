import React, { Component } from "react";
import { connect } from "react-redux";
import "./ImageUpload.css";
import { imageUpload } from "../actions/actions";

class ImageUpload extends Component {
  onChange(e) {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files[0]);
    this.props.imageUpload(e.target.files[0]);
  }
  render() {
    return (
      <div className="form-group nice-input-upload">
        <input
          onChange={this.onChange.bind(this)}
          type="file"
          className=" form-control-file text-primary font-weight-bold"
          data-title="Click me to add images"
        ></input>
      </div>
    );
  }
}
const mapDispatchToPos = {
  imageUpload,
};

export default connect(null, mapDispatchToPos)(ImageUpload);
