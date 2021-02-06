import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const API_ROOT = "https://apidemo.scanteie.eu";

export default class ImageBrowser extends Component {
  render() {
    console.log(this.props.images);
    return (
      <div className="row t-4 mb-4">
        <TransitionGroup component={null}>
          {this.props.images.map((image, id) => {
            console.log(`${API_ROOT}${image.url}`);
            return (
              <CSSTransition timeout={1000} classNames="fade" key={image.id}>
                <div className="col-md-6 col-lg-6">
                  <div className="mt-2 mb-2">
                    <img
                      src={`${API_ROOT}${image.url}`}
                      className="img-fluid"
                    ></img>
                    <div className="mb-2">
                      <button
                        type="button"
                        className="btn btn-outline-danger bnt-sm"
                        onClick={() => {
                          this.props.delete(image.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    );
  }
}
