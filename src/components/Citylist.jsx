
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet';
import axios from "axios";
import Load from "./Loader";
import "./Citylist.css";
import 'leaflet/dist/leaflet.css';
import { Button } from "@mantine/core";

function Citylist() {
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { name } = useParams();

  const customIcon = new L.Icon({
    iconUrl: '/Leaflet/marker-icon.png', // specify the path to your marker image file
    iconSize: [25, 41], // size of the marker icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open
  });


  const splitCoordinates = (str) => {
    const ustr = str.split("°");
    ustr[0] = parseFloat(ustr[0].trim());
    ustr[1] = ustr[1].trim();
    return ((ustr[1] === "W") || (ustr[1] === "S")) ? -ustr[0] : ustr[0];
  };
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
    axios.get(`${API_URL}/countries.json`)
      .then((response) => {
        const countries = response.data;
        const countryArr = Object.keys(countries).map((id) => {
          return {
            id,
            ...countries[id],
          };
        });
        const specificCountry = countryArr.find(cityItem => cityItem.name.toLowerCase() === name.toLowerCase());
        specificCountry.latitude = splitCoordinates(specificCountry.latitude);
        specificCountry.longitude = splitCoordinates(specificCountry.longitude);
        setSelectedCountry(specificCountry);
      }).catch(e => console.log("Error", e));

  }, []);


  if (cities === null) {
    return <Load />;
  }

  const groupedCities = cities.reduce((acc, city) => {
    acc[city.country] = acc[city.country] || [];
    acc[city.country].push(city);
    return acc;
  }, {});

  const Map = () => {

    return (
      <div className="frame">
        <MapContainer className="map" center={(selectedCountry) ?
          [selectedCountry.latitude, selectedCountry.longitude] : [51.505, -0.09]
        }
          zoom={6}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {
            Object.keys(groupedCities).map((country) => (
              country === name && (
                groupedCities[country].map((location) => (
                  ((location.longitude) && (location.latitude) && (
                    <Marker key={location.id} position={[splitCoordinates(location.latitude), splitCoordinates(location.longitude)]}  icon={customIcon}>
                      {/* Popup that appears when the marker is clicked */}
                      <Popup><h3 >{location.city}</h3>
                        <Link to={`/cities/${location.city}`}>
                        <Button variant ="filled" color="green">More Details...</Button></Link>
                      </Popup>
                    </Marker>
                  ))
                )))
            ))}
        </MapContainer>
      </div>
    );
  };


  return (

    <>
      <div className="Page">
          {Object.keys(groupedCities).map((country) => (
            country === name && (

              <div className="Country-city" key={country}>
                <Link to={`/countries/${country}`} >
                  <h2>{country}</h2>
                </Link>
               
                  {groupedCities[country].map((cityDetails) => (
                   <div className="card" key={cityDetails.id}>
                      <Link className="City-card" to={`/cities/${cityDetails.city}`}>
                        <h3>{cityDetails.city}</h3> 
                      </Link>
                    </div>
                  ))}
               
              </div>
            )
          ))}
        </div >
        <div className="map-window">
          <Map />
        </div>
    </>
  );
}

export default Citylist;
