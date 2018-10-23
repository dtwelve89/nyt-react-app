import React from "react";
import "./ActionBtn.css";

const ActionBtn = props => (
  <span className="btn btn-light float-right" {...props}>
    {props.action}
  </span>
);

export default ActionBtn;
