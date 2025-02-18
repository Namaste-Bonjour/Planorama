import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function navbar() {
  return (
    <div className="Navbar">
      <h1>Planorama</h1>
      <nav className="nav">
        <NavLink to="/">
          <button>Home</button>
        </NavLink>
        <NavLink to="/countries/create">
          <button>Contribute</button>
        </NavLink>
        <NavLink to="" >
          <button>About us</button>
        </NavLink>
      </nav>
    </div>
  );
}
export default navbar;