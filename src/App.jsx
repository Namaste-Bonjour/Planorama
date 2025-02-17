import Navbar from "./components/Navbar";
import CountryList from "./components/CountryList";
import Footer from "./components/Footer";
import React from "react";
import "./App.css";


function App() {
  return (
    <>
      <Navbar />
    <CountryList />
      <Footer />;
    </>
  );
}

export default App;
