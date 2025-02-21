import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import Redirect from "../components/Redirect";
import { Button } from "@mantine/core";


function UpdateCities({ countries, user }) {

    const [city, setCity] = useState("");
    const [activities, setActivities] = useState("");
    const [time, setTime] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [landmarks, setLandmark] = useState("");
    const [restaurants, setRestaurant] = useState("");
    const [budget, setBudget] = useState("");
    const [image, setImage] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [identifier, setIdentifier] = useState("");
    const navigate = useNavigate();
    const {cityId} = useParams();


    useEffect(() => {
        axios.get(`${API_URL}/cities.json`)
            .then((response) => {
                const cityObj = response.data;
                console.log(cityObj);
                const cityArr = Object.keys(cityObj).map((id) => {
                    return {
                        id,
                        ...cityObj[id],
                    };
                });

        const specificCity = cityArr.find(cityItem => cityItem.city.toLowerCase() === cityId.toLowerCase());

                if (specificCity) {
                    setIdentifier(specificCity.id);
                    setCountry(specificCity.country);
                    setCity(specificCity.city);
                    setDescription(specificCity.description);
                    setLandmark(specificCity.landmarks);
                    setActivities(specificCity.activities);
                    setTime(specificCity.time);
                    setRestaurant(specificCity.restaurants);
                    setBudget(specificCity.budget);
                    setImage(specificCity.image);
                    setLatitude(specificCity.latitude);
                    setLongitude(specificCity.longitude);
                    console.log(specificCity);
                } else {
                    console.log("City not found");
                }
            })
            .catch(e => console.log("Error", e));
    }, [cityId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const updatedCity = {
            country: country,
            city: city,
            activities: activities,
            time: time,
            description: description,
            landmarks: landmarks,
            restaurants: restaurants,
            image: image,
            budget: budget,
            latitude: latitude,
            longitude : longitude
        };
        axios.put(`${API_URL}/cities/${identifier}.json`, updatedCity)
            .then((response) => {
                console.log(response.data)
                navigate("/")
            })
            .catch(e => console.log("Error", e));
    };

    return (
        <>
        {user ?(
            <div className="EditCity">

                <h2>Edit City details</h2>

                <form onSubmit={handleFormSubmit} >


                    <label>Country :
                        <select
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}

                        >
                            <option value="">Select a country</option>
                            { console.log(countries)}
                           { countries && countries.length > 0 ? (
                                countries.map((countryDetail) => (
                                    <option key={countryDetail.id} value={countryDetail.name}>
                                        {countryDetail.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No countries available</option>
                            )}
                        </select>
                    </label>


                    <label> City :
                        <input type="text"
                            name="city"
                            placeholder="Enter city name"
                            value={city}
                            onChange={(e) => { setCity(e.target.value) }} />
                    </label>

                    <label> Landmarks :
                        <input type="text"
                            name="landmarks"
                            placeholder="Enter landmark"
                            value={landmarks}
                            onChange={(e) => { setLandmark(e.target.value) }} />
                    </label>

                    <label> Description :
                        <input type="text"
                            name="description"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }} />
                    </label>


                    <label> Activities :
                        <input type="text"
                            name="activities"
                            placeholder="Enter activities"
                            value={activities}
                            onChange={(e) => { setActivities(e.target.value) }} />
                    </label>

                    <label> Best time to visit :
                        <input type="text"
                            name="time"
                            placeholder="Enter Best time to visit"
                            value={time}
                            onChange={(e) => { setTime(e.target.value) }} />
                    </label>

                    <label> Restaurants :
                        <input type="text"
                            name="restaurants"
                            placeholder="Enter Restaurant"
                            value={restaurants}
                            onChange={(e) => { setRestaurant(e.target.value) }} />
                    </label>

                    <label> Image :
                        <input type="url"
                            name="image"
                            placeholder="Enter image"
                            value={image}
                            onChange={(e) => { setImage(e.target.value) }} />
                    </label>

                    <label> Budget(per person) :
                        <input type="text"
                            name="budget"
                            placeholder="Enter budget"
                            value={budget}
                            onChange={(e) => { setBudget(e.target.value) }} />
                    </label>

                    <label> Latitude :
                        <input type="text"
                            name="latitude"
                            placeholder="Enter latitude"
                            value={latitude}
                            onChange={(e) => { setLatitude(e.target.value) }} />
                    </label>

                    <label> Longitude :
                        <input type="text"
                            name="longitude"
                            placeholder="Enter longitude"
                            value={longitude}
                            onChange={(e) => { setLongitude(e.target.value) }} />
                    </label>
                    <Button type= "submit" variant="filled" color="violet" radius="md"> Update 🔁 </Button>
                   
                </form>
            </div>):
            (<div>
                <Redirect />
            </div>)
           
            }
        </>
    )
}

export default UpdateCities;