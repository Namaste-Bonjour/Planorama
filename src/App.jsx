import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreateCountries from "./Pages/CreateCountries";
import Citylist from "./components/Citylist";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
<Route path ="/" element={<HomePage />} />
<Route path ="/countries/create" element={<CreateCountries />} />
<Route path ="/countries/:name" element={<Citylist />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;