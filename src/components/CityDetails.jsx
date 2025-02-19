import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";
import axios from "axios";


function CityDetails() {

    const { cityId } = useParams();
    const [cityDetails, setCityDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCity();
    }, [cityId]);


    const getCity = () => {
        axios.get(`${API_URL}/cities.json`)
            .then((response) => {
                const cityObj = response.data;

                const cityArr = Object.keys(cityObj).map((id) => {
                    return {
                        id,
                        ...cityObj[id],
                    };
                });

                const specificCity = cityArr.find(cityItem => cityItem.city.toLowerCase() === cityId.toLowerCase());

                if (specificCity) {
                    return setCityDetails(specificCity);
                } else {
                    console.log("City not found");
                }
            })
            .catch((e) => console.log("No cities found", e));
    }


    const deleteCity = () => {

        axios.delete(`${API_URL}/cities/${cityDetails.id}.json`)

            .then(_response => {

                navigate("/");
            })
            .catch(e => console.log("Error"));
    }


    if (cityDetails === null) {
        return <p> Loading!!!!</p>
    }


    const sortedActivities = cityDetails.activities
        .split(',')
        .map(activity => activity.trim())
        .sort();

    const sortedLandmark = cityDetails.landmarks
        .split(',')
        .map(land => land.trim())
        .sort();

    const sortedRestaurants = cityDetails.restaurants
        .split(',')
        .map(rest => rest.trim())
        .sort();

    return (

        <>
            <h3 className="city">{cityDetails.city}</h3>
            <p><b>{cityDetails.description}</b></p>
            <ul> <b>Landmark:</b>{sortedLandmark.map((land, i) => {
                return (
                    <li className="activity" key={i}>
                        {land}
                    </li>)
            })}  </ul>
            <ul><b> Activities: </b>{sortedActivities.map((elm, i) => {
                return (
                    <li className="activity" key={i}>
                        {elm}
                    </li>)

            })}  </ul>

            <p><b>Best Time to visit: </b> {cityDetails.time}</p>
            <ul><b> Restaurants: </b>{sortedRestaurants.map((food, i) => {
                return (
                    <span className="activity" key={i}>
                        {food} <br />
                    </span>)
            })} </ul>
            <div>
                <img src={cityDetails.image} />
            </div>

            <p><b>Budget (per person): </b>{cityDetails.budget}</p>



            <Link to={`/cities/edit/${cityId}`}> <button> Edit City</button> </Link>
            <button onClick={(deleteCity)} > Delete City </button>


        </>


    )

}
export default CityDetails;