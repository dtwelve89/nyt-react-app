import React from "react";

const Query = props => (
  <div className="card">
    <h3 className="card-header">Query</h3>
    <div className="card-body">
      <form>
        <div className="form-group">
          <label htmlFor="topic">Topic</label>
          <input
            onChange={props.handleInputChange}
            value={props.value}
            name="topic"
            type="text"
            className="form-control"
            placeholder="Search for a topic"
            id="topic"
          />
          <br />
          <button
            onClick={props.handleFormSubmit}
            className="btn btn-dark"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Query;
