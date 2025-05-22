import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import { Button } from '@mantine/core';
import axios from "axios";
import "./CountryList.css";
import "./CityDetails.css";
import Load from "./Loader";


function CityDetails({user}) {
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
        user?
        (axios
            .delete(`${API_URL}/cities/${cityDetails.id}.json`)
            .then(() => {
                navigate("/");
            })
            .catch((e) => console.log("Error"))):
            (
                navigate("/Login"));
    };

    if (cityDetails === null) {
        return <Load />;
    }

    const sortedDetails = (str) => {
        return str
            .split(".")
            .map((item) => item.trim())
            .filter((item) => item !== "")
            .sort();
    };

    const sortedLandmark = sortedDetails(cityDetails.landmarks);
    const sortedActivities = sortedDetails(cityDetails.activities);
    const sortedRestaurants = sortedDetails(cityDetails.restaurants);

    return (

       <>
        <div className="city-wrapper">
            <h2 className="city"><i> {cityDetails.city} </i> </h2></div>
            <p className="description"><b>{cityDetails.description}</b></p>

            <div>
                <img className="image" src={cityDetails.image} />
            </div>
            <div className="info">
                <label className="Landmark"><b>Landmark:</b>
                    <ul className="land"> {sortedLandmark.map((land, i) => {
                        return (
                            <li > {land} </li>);
                    })}  </ul>
                </label>
                <label><b> Activities: </b>
                    <ul className="activity" > {sortedActivities.map((elm, i) => {
                        return (
                            <li >
                                {elm} </li>)

                    })}  </ul>
                </label>
            </div>

            <div className="moreDetails" >
                <label> <b> Restaurants: </b>
                    <ul>{sortedRestaurants.map((food, i) => {
                        return (
                            <span className="act" key={i}>
                                <li>  {food} </li>
                            </span>)
                    })} </ul>
                </label>

                <label className=" time">
                    <p><b>Best Time to visit: </b> {cityDetails.time}</p>
                    <p><b>Budget (per person): </b>{cityDetails.budget}</p>

                    <p className="Stay"><b> Accomodation: </b>
                        <label>
                            <a href="https://www.booking.com/index.en-gb.html?aid=2311236;label=en-de-booking-desktop-rlPWSbMHB321nhxukayXdwS652796016687:pl:ta:p1:p2:ac:ap:neg:fi:tikwd-334108349:lp9042217:li:dec:dm;ws=&gad_source=1&gclid=CjwKCAiAn9a9BhBtEiwAbKg6fs9m9Ibg1xLPIB2T8WyZ5DkDjL6_5cIBHonpuAaOeBXlUsWaGusp9hoCI6QQAvD_BwE" target="_blank" rel="noopener noreferrer">
                                <img src="https://www.yieldplanet.com/wp-content/uploads/2019/05/3Y-500x500-1.jpeg" alt="Booking.com" />
                            </a>
                            <a href="https://www.airbnb.com/" target="_blank" rel="noopener noreferrer">
                                <img src="https://images.seeklogo.com/logo-png/28/1/airbnb-logo-png_seeklogo-284907.png" alt="Airbnb" />
                            </a>
                        </label>
                    </p>
                </label>
            </div>

            <div className="button">
                <Link to={`/cities/edit/${cityId}`}>
                    <Button variant="filled" color="indigo" radius="md">Edit City ✏️</Button>  </Link>

                <Button variant="filled" color="red" onClick={(deleteCity)}>Delete City 🗑️ </Button>
            </div>
     </>


    )

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
      <Link to={`/CityRating/${cityDetails.city}`}></Link>
    </>
  );
}
export default CityDetails;
