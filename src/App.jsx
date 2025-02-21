import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Citylist from "./components/Citylist";
import CountryList from "./components/CountryList";
import CreateCities from "./Pages/CreateCities";
import CityDetails from "./components/CityDetails";
import UpdateCities from "./Pages/UpdateCities";
import AboutUs from "./Pages/AboutUs";
import CityRating from "./Pages/CityRating";
import AuthStatus from "./components/AuthenticationStatus";
import LoginForm from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Init from "./config/authentication";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [countries, setCountries] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
  }, []);

  return (
    <>
      <Init />
      <Navbar />
      <Routes>
        <Route path="/" element={<CountryList setCountries={setCountries} />} />
        <Route
          path="/countries/create"
          element={<CreateCities countries={countries} user={user} />}
        />
        <Route path="/countries/:name" element={<Citylist />} />
        <Route path="/cities/:cityId" element={<CityDetails user={user} />} />
        <Route
          path="/cities/edit/:cityId"
          element={<UpdateCities countries={countries} user={user} />}
        />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/CityRating" element={<CityRating />} />
        <Route path="/CityRating/:cityName" element={<CityRating />} />
        <Route path="/Authenticate" element={<AuthStatus user={user} />} />
        <Route path="/Login" element={<LoginForm user={user} />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
