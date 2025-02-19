import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Citylist from "./components/Citylist";
import CountryList from "./components/CountryList";
import CreateCities from "./Pages/CreateCities";
import CityDetails from "./components/CityDetails";
import UpdateCities from "./Pages/UpdateCities";


function App() {

  // "/cities/edit/Stuttgart"

  const [countries, setCountries] = useState([]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CountryList setCountries={setCountries} />} />
        <Route path="/countries/create" element={<CreateCities countries={countries} />} />
        <Route path="/countries/:name" element={<Citylist />} />
        <Route path="/cities/:cityId" element={<CityDetails />} />
        <Route path="/cities/edit/:cityId" element={<UpdateCities />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;