import React from "react";
import "./Navbar.css";

const Navbar = props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">

    <a className="navbar-brand" href="/">NYT-React</a>

    <a href="/">Search</a>

    <a href="/saved">Saved Articles</a>
    
  </nav>
);

export default Navbar;