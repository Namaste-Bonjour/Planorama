import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Create.css";
import CreateCountries from "./CreateCountries";
import axios from "axios";
import { API_URL } from "../config/api";



function CreateCities({ countries }) {

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
    const navigate = useNavigate();




    const handleSubmit = (e) => {
        e.preventDefault();

        const newCity =
        {
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
            longitude: longitude
        };


        axios.post(`${API_URL}/cities.json`, newCity)
            .then((response) => {
                console.log(response.data)
                navigate("/")
            })
            .catch(e => console.log("Error", e));
    };
    return (
        <>
            <CreateCountries />
            <div className="CreateCities">
                <h2> Add Cities </h2>

                <form onSubmit={handleSubmit} >


                    <label>Country :
                        <select
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        >
                            <option value="">Select a country</option>
                            {countries && countries.length > 0 ? (
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

                    <button> Create </button>
                </form>
            </div>
        </>


    )
}
export default CreateCities;