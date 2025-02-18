import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import axios from "axios";


function CityDetails() {

    const { city } = useParams();
    const [cityDetails, setCityDetails] = useState(null);
    const navigate = useNavigate();
   
    useEffect(() => {
        getCity();
    }, [city]);


    const getCity = () => {
        axios.get(`${API_URL}/cities.json`)
            .then((response) => {
                const cityObj = response.data;
              console.log(cityObj)
                const cityArr = Object.keys(cityObj).map((id) => {
                    return {
                        id,
                        ...cityObj[id],
                    };
                });

                const specificCity = cityArr.find(cityItem => cityItem.city.toLowerCase() === city.toLowerCase());

                if (specificCity) {
                  return   setCityDetails(specificCity);
                } else {
                    console.log("City not found");
                }
            })
            .catch((e) => console.log("No cities found", e));
    }
    

    const deleteCity = () => {
        console.log(cityDetails.id)
        axios.delete(`${API_URL}/cities/${cityDetails.id}.json`)
      
            .then(response => {
                console.log(response.data)
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
 <p>{cityDetails.image}</p>
 <p><b>Budget (per person): </b>{cityDetails.budget}</p>
<Link to ="/"> <button> Back to Cities </button></Link>
<button onClick={(deleteCity)} > Delete City </button>

        </>


    )

}
export default CityDetails;