import React from "react";

const Results = props => (
  
  // <div className="card">
  //   <h3 className="card-header">Results</h3>
  //   <div className="card-body">
          <div className="card">
            <div className="card-body">
              <button className="btn btn-dark float-right" onClick={() => props.onChange(props.id)}>Save Article</button>
              <a href={props.url} rel="noopener noreferrer" target="_blank">
                <button className="btn btn-light float-right">View Article</button>
              </a>
              <h5 className="card-title">{props.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{props.date}</h6>
            </div>
          </div>
  //   </div>
  // </div>
);

export default Results;