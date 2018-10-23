import React from "react";

const Container = props => (
  <div className="card">
    <h3 className="card-header">{props.category}</h3>
    <div className="card-body wrapper">{props.children}</div>
  </div>
);

export default Container;
