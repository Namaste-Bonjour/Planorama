import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreateCountries from "./Pages/CreateCountries";
import Citylist from "./components/Citylist";
import CountryList from "./components/CountryList";
import CreateCities from "./Pages/CreateCities";

function App() {
  const [countries, setCountries] = useState([]);
  return (
    <>    
      <Navbar />
      <Routes>
<Route path ="/" element={<CountryList setCountries={setCountries} />} />
<Route path ="/countries/create" element={<CreateCities countries={countries} />} />
<Route path ="/countries/:name" element={<Citylist />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;