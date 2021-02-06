import React from "react";
import classNames from "classnames";
import { store } from "./index";
import { useState } from "react";

export const renderField = ({ input, label, type, value, meta: { error } }) => {
  const [err, setErr] = useState(null);
  store.subscribe(() => {
    let state = store.getState();
    if (state.blogPostList.error) {
      setErr(state.blogPostList.error);
    }
    if (state.auth.error) {
      setErr(state.blogPostList.error);
    }
    //console.log("state function", state.blogPostList.error);
  });
  const classes = classNames(
    ("form-control",
    {
      "is-invalid": err,
    })
  );
  return (
    <div className="form-group">
      {label && label != "" && <label>{label}</label>}
      {type != "textarea" && (
        <input {...input} type={type} value={value} className={classes}></input>
      )}
      {type == "textarea" && (
        <textarea {...input} value={value} className={classes}></textarea>
      )}
      {err && <small className="form-text text-danger">{err}</small>}
    </div>
  );
};
