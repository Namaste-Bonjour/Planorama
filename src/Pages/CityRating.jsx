import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CityRating = () => {
  const { cityName } = useParams();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [allRatings, setAllRatings] = useState([]);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem("cityRatings")) || [];
    setAllRatings(storedRatings);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRating = { cityName, rating, comment };
    const updatedRatings = [...allRatings, newRating];
    localStorage.setItem("cityRatings", JSON.stringify(updatedRatings));
    setAllRatings(updatedRatings);
    setSubmitted(true);
  };

  if (!cityName) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
        <h1>All City Ratings</h1>
        {allRatings.length === 0 ? (
          <p>No ratings available yet.</p>
        ) : (
          allRatings.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #ccc",
                paddingBottom: "1rem",
              }}
            >
              <p>
                <strong>City:</strong> {item.cityName}
              </p>
              <p>
                <strong>Rating:</strong> {item.rating}
              </p>
              <p>
                <strong>Comment:</strong> {item.comment}
              </p>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>Rate {cityName}</h1>
      {submitted ? (
        <div>
          <p>Thank you for your feedback!</p>
          <p>
            <strong>Your Rating:</strong> {rating}
          </p>
          <p>
            <strong>Your Comment:</strong> {comment}
          </p>
          <Link to="/CityRating">See all ratings</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="rating"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Rating (1 to 5):
            </label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="comment"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
    </div>
  );
};

export default CityRating;
