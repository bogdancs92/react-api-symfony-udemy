import React, { Component } from "react";
import classNames from "classnames";

class Paginator extends Component {
  constructor(props) {
    super(props);
    const pageCount = props.pageCount;
    this.range = [];
    for (let i = 1; i <= pageCount; i++) {
      this.range.push(i);
    }
  }
  render() {
    const { currentPage } = this.props;

    return (
      <nav>
        <ul className="pagination">
          <li key="-3" className="page-item">
            <button className="page-link" onClick={() => this.props.prevPage()}>
              Previous
            </button>
          </li>
          {this.range.map((page) => {
            return (
              <li
                key={page}
                className={classNames("page-item", {
                  active: currentPage == page,
                })}
              >
                <button
                  className="page-link"
                  onClick={() => this.props.setPage(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li key="-2" className="page-item">
            <button className="page-link" onClick={() => this.props.nextPage()}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Paginator;
