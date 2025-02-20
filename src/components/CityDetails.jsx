import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import axios from "axios";
import "./CountryList.css";

function CityDetails() {
  const { cityId } = useParams();
  const [cityDetails, setCityDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCity();
  }, [cityId]);

  const getCity = () => {
    axios
      .get(`${API_URL}/cities.json`)
      .then((response) => {
        const cityObj = response.data;
        const cityArr = Object.keys(cityObj).map((id) => ({
          id,
          ...cityObj[id],
        }));
        const specificCity = cityArr.find(
          (cityItem) => cityItem.city.toLowerCase() === cityId.toLowerCase()
        );
        if (specificCity) {
          setCityDetails(specificCity);
        } else {
          console.log("City not found");
        }
      })
      .catch((e) => console.log("No cities found", e));
  };

  const deleteCity = () => {
    axios
      .delete(`${API_URL}/cities/${cityDetails.id}.json`)
      .then(() => {
        navigate("/");
      })
      .catch((e) => console.log("Error"));
  };

  if (cityDetails === null) {
    return <p>Loading....</p>;
  }

  const sortedDetails = (str) => {
    return str
      .split(".")
      .map((item) => item.trim())
      .sort();
  };

  const sortedLandmark = sortedDetails(cityDetails.landmarks);
  const sortedActivities = sortedDetails(cityDetails.activities);
  const sortedRestaurants = sortedDetails(cityDetails.restaurants);

  return (
    <>
      <h2 className="city">
        <i>{cityDetails.city}</i>
      </h2>
      <p className="description">
        <b>{cityDetails.description}</b>
      </p>
      <div>
        <img className="image" src={cityDetails.image} alt={cityDetails.city} />
      </div>
      <label className="Landmark">
        <ul>
          <b>Landmark:</b>
          {sortedLandmark.map((land, i) => (
            <li className="activity" key={i}>
              {land}
            </li>
          ))}
        </ul>
      </label>
      <ul>
        <b>Activities:</b>
        {sortedActivities.map((elm, i) => (
          <li className="activity" key={i}>
            {elm}
          </li>
        ))}
      </ul>
      <p>
        <b>Best Time to visit:</b> {cityDetails.time}
      </p>
      <ul>
        <b>Restaurants:</b>
        {sortedRestaurants.map((food, i) => (
          <span className="activity" key={i}>
            {food} <br />
          </span>
        ))}
      </ul>
      <p>
        <b>Budget (per person):</b> {cityDetails.budget}
      </p>
      <Link to={`/cities/edit/${cityId}`}>
        <button>Edit City</button>
      </Link>
      <button onClick={deleteCity}>Delete City</button>
      <Link to={`/CityRating/${cityDetails.city}`}>
        <button>Rate this City</button>
      </Link>
    </>
  );
}

export default CityDetails;
