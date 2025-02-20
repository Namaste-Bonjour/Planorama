import React, { useState, useEffect } from "react";

const cityData = {
  France: ["Lyon", "Nice", "Amiens"],
  Germany: ["Dresden", "Munich"],
  Italy: ["Bologna", "Florence"],
  Netherlands: ["Rotterdam", "Amsterdam"],
  Switzerland: ["Lucerne", "Geneva"],
  Spain: ["Valencia", "Seville"],
  Canada: ["Calgary", "Toronto"],
  "United Kingdom": ["Bath", "Edinburgh"],
  Australia: ["Adelaide", "Sydney"],
  Brazil: ["Salvador", "Rio de Janeiro"],
  "United Arab Emirates": ["Abu Dhabi", "Dubai"],
  India: ["Mysore", "Auli", "Jaipur", "Delhi"],
  Japan: ["Kanazawa", "Tokyo"],
  "South Korea": ["Busan", "Seoul"],
};

const CityRating = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [allRatings, setAllRatings] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newRating, setNewRating] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("cityRatings")) || [];
    setAllRatings(storedRatings);
  }, []);

  const cityRatings = selectedCity
    ? allRatings.filter((item) => item.cityName === selectedCity)
    : [];

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRatingObj = {
      cityName: selectedCity,
      rating: newRating,
      comment: newComment,
    };
    const updatedRatings = [...allRatings, newRatingObj];
    localStorage.setItem("cityRatings", JSON.stringify(updatedRatings));
    setAllRatings(updatedRatings);
    setNewRating("");
    setNewComment("");
    setFormVisible(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>Rate a City</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Country:
        </label>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">--Select a Country--</option>
          {Object.keys(cityData).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      {selectedCountry && (
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            City:
          </label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            style={{ width: "100%", padding: "0.5rem" }}
          >
            <option value="">--Select a City--</option>
            {cityData[selectedCountry].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedCity && (
        <>
          <h2>Ratings for {selectedCity}</h2>
          {cityRatings.length === 0 ? (
            <p>No ratings for {selectedCity} yet.</p>
          ) : (
            cityRatings.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "1rem",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "1rem",
                }}
              >
                <p>
                  <strong>Rating:</strong> {item.rating}
                </p>
                <p>
                  <strong>Comment:</strong> {item.comment}
                </p>
              </div>
            ))
          )}
          <button
            onClick={() => setFormVisible(!formVisible)}
            style={{ padding: "0.5rem 1rem", marginBottom: "1rem" }}
          >
            {formVisible ? "Cancel" : "Add a New Rating"}
          </button>
          {formVisible && (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Rating (1 to 5):
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newRating}
                  onChange={(e) => setNewRating(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem" }}
                  required
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                  Comment:
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="5"
                  style={{ width: "100%", padding: "0.5rem" }}
                  required
                />
              </div>
              <button type="submit" style={{ padding: "0.5rem 1rem" }}>
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default CityRating;
