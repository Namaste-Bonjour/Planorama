import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import "./Create.css";
import Redirect from "../components/Redirect";
import { Button } from "@mantine/core";




function CreateCountries({user}) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [latitude, setLatitude] =useState("");
    const [longitude, setLongitude] =useState("");
    const [existingCountries, setExistingCountries] = useState([]);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${API_URL}/countries.json`)
            .then((response) => {
                
    console.log(user);
                const countryObj = response.data;
                const countryArr = Object.keys(countryObj).map((id) => {
                    return {
                        id,
                        ...countryObj[id],
                    };
                });
                setExistingCountries(countryArr)
            })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const countryExists = existingCountries.some(
            (country) => country.name.toLowerCase() === name.toLowerCase()
        );

        if (countryExists) {
            setMsg("This country already exists!");
            return;
        }

        const newCountry = {
            name: name,
            image: image,
            latitude:latitude,
            longitude:longitude
        };

        axios.post(`${API_URL}/countries.json`, newCountry)
            .then((_response) => {
                navigate("/");
            })
            .catch(e => console.log("Error", e));

    };


    return (
        <>
        <div className="CreateCountries">

                <h2> Add Country </h2>
                {msg && <p className="error"> {msg}</p>}
                <form onSubmit={handleSubmit} >

                    <label> Name :
                        <input type="text"
                            name="name"
                            placeholder="Enter country name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                    </label>

                    <label> Image :
                        <input type="url"
                            name="image"
                            placeholder="Enter image URL"
                            value={image}
                            onChange={(e) => { setImage(e.target.value) }} />
                    </label>

                    <label> Latitude :
                        <input type="text"
                            name="latitude"
                            placeholder="Enter latitude of the country "
                            value={latitude}
                            onChange={(e) => { setLatitude(e.target.value) }} />
                    </label>

                    <label> Longitude :
                        <input type="text"
                            name="longitude"
                            placeholder="Enter longitude of the country "
                            value={latitude}
                            onChange={(e) => { setLongitude(e.target.value) }} />
                    </label>


<Button variant="filled" color="green">Create 🔧</Button>
                    
                </form>
            </div>
</>
    )
}

export default CreateCountries;