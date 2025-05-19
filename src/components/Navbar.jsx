import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Button } from "@mantine/core";
import logo from "../assets/logo1.gif";

function navbar() {
  return (
    <div className="Navbar">
     <img src={logo} alt="Planorama logo" className="logo" />
      <div className="title-wrapper">
   
      <h1 className="title">Planorama</h1></div>
      <nav className="nav">
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
      </nav>
    </div>
  );
}
export default navbar;
