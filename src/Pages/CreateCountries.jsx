import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";






function CreateCountries () {
const [name, setName] = useState("");
const [image, setImage] =useState("");
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();

const newCountry ={
    name: name,
    image:image
};

axios.post(`${API_URL}/countries.json`, newCountry)
.then((response) => {
    navigate("/");
})
.catch(e => console.log("Error", e));

}

    return (
<>
<div className="CreateCountries">

<h2> Add Country </h2>

<form onSubmit ={handleSubmit} >

<label> Name :
    <input type ="text"
    name ="name"
    placeholder="Enter country name"
    value ={name}
    onChange= {(e) => {setName(e.target.value)}} />

</label>

<label> Image :
    <input type ="url"
    name ="image"
    placeholder="Enter image URL"
    value={image}
    onChange= {(e) => {setImage(e.target.value)}} />

</label>

<button> Create </button>
</form>
</div>
</>

    )
}

export default CreateCountries;