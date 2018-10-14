import React from "react";
import "./Navbar.css";

const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul>
      <li>
        <a className="navbar-brand" href="/">NYT-React</a>
      </li>
      <li>
        <a href="/">Search</a>
      </li>
      <li>
        <a href="/saved">Saved Articles</a>
      </li>
    </ul>
  </nav>
);

export default Navbar;