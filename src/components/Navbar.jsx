import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Button } from "@mantine/core";
import logo from "../assets/logo1.gif";

function navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <div className="Navbar">
      <div className="brand">
     <img src={logo} alt="Planorama logo" className="logo" />
      <h1 className="title">Planorama</h1><button className="burger" onClick={toggleMenu}>
      &#9776; {/* Unicode for ☰ */}
    </button></div>
      <nav className={`nav ${isMenuOpen ? "show" : ""}`}>
        <div className="button">
        <NavLink to="/">
        <Button variant="filled"color="grape">Home</Button>
        </NavLink>
        <NavLink to="/countries/create">
        <Button variant="filled"color="grape">Contribute</Button>
        </NavLink>
        <NavLink to="/CityRating">
        <Button variant="filled"color="grape">Rate a City</Button>
        </NavLink>
        <NavLink to="/AboutUs">
        <Button variant="filled"color="grape">About us</Button>
        </NavLink>
        <NavLink to="/Authenticate" >
        <Button variant="filled"color="grape">Login 👤</Button>
        </NavLink>
        </div>
      </nav>
    </div>
  );
}
export default navbar;
