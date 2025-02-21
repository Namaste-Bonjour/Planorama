<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import { useEffect } from "react";
import { useState } from "react";
>>>>>>> 9b37c572038918e97bf144896b74c512caf973ab
import { API_URL } from "../config/api";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CountryList.css";
<<<<<<< HEAD
=======
import Load from "./Loader";

>>>>>>> 9b37c572038918e97bf144896b74c512caf973ab

function CountryList({ setCountries }) {
  const [countries, setCountriesData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/countries.json`)
      .then((response) => {
        const countriesObj = response.data;
        const countriesArr = Object.keys(countriesObj).map((id) => ({
          id,
          ...countriesObj[id],
        }));
        setCountriesData(countriesArr);
        setCountries(countriesArr);
      })
      .catch((e) => console.log("Error", e));
  }, [setCountries]);

<<<<<<< HEAD
  if (countries === null) {
    return "Loading";
  }

  const filteredCountries = selectedCountry
    ? countries.filter((c) => c.name === selectedCountry)
    : countries;

  return (
    <>
      <div style={{ margin: "1rem" }}>
        <label htmlFor="countryDropdown" style={{ marginRight: "0.5rem" }}>
          Select a Country:
        </label>
        <select
          id="countryDropdown"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        >
          <option value="">--All Countries--</option>
          {countries.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="Country-List">
        {filteredCountries.map((countryDetails) => (
          <label className="card" key={countryDetails.id}>
            <Link to={`/countries/${countryDetails.name}`}>
              <img src={countryDetails.image} alt={countryDetails.name} />
              <h2>{countryDetails.name}</h2>
            </Link>
          </label>
        ))}
      </div>
    </>
  );
=======
if(country === null) {
    return <Load/>;
>>>>>>> 9b37c572038918e97bf144896b74c512caf973ab
}

export default CountryList;
