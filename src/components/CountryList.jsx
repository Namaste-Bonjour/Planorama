

import { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../config/api";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CountryList.css";



function CountryList() {
const[country, setCountry] = useState(null);

useEffect(() => {
    axios.get(`${API_URL}/countries.json`)
    .then((response) => {
        const countriesObj = response.data;
        const countriesArr = Object.keys(countriesObj).map((id) => {
           return { id,
            ...countriesObj[id],
           };
        });

        setCountry(countriesArr);
    })
    .catch(e => console.log("Error" , e));
},[]);

if(country === null) {
    return "Loading";
}

    return (

        <>
        
            <div className="Country-List">
                {country.map((countryDetails) => {
                    return(
                        <label className="card" key ={countryDetails.id}>
                            <Link to ={`/countries/${countryDetails.name}`}>
                            <img src={countryDetails.image} />
                            <h2>{countryDetails.name}</h2>
                            </Link>
                            </label>
                    )
                })}
           

            </div>


        </>
    )
}
export default CountryList;
