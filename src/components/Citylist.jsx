
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Citylist() {
  const [cities, setCities] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    axios.get(`${API_URL}/cities.json`)
      .then((response) => {
        const citiesObj = response.data;
        const citiesArr = Object.keys(citiesObj).map((id) => {
          return {
            id,
            ...citiesObj[id],
          };
        });
        const sortedCities = citiesArr.sort((a, b) => {
          if (a.country < b.country) return -1;
          if (a.country > b.country) return 1;
          return 0;
        });

        setCities(sortedCities);
      })
      .catch(e => console.log("Error", e));
  }, []);


  if (cities === null) {
    return "Loading........";
  }

  const groupedCities = cities.reduce((acc, city) => {
    acc[city.country] = acc[city.country] || [];
    acc[city.country].push(city);
    return acc;
  }, {});

  return (

    <>
      <div className="Cities-List">
        {Object.keys(groupedCities).map((country) => (
          country === name && (

            <div key={country}>
              <Link to={`/countries/${country}`}>
                <h2>{country}</h2>
              </Link>
              <div className="country-cities">
                {groupedCities[country].map((cityDetails) => (

                  <div className="card" key={cityDetails.id}>
                    <Link to={`/cities/${cityDetails.city}`}>
                      <h3>{cityDetails.city}</h3>  </Link>
                 
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </>
  );
}

export default Citylist;
