import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";

import fetchWeather from "./api/api";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const searchInput = useRef(null);
  useEffect(() => {
    searchInput.current.focus();
  }, [query]);
  const search = async (e) => {
    if (e.key === "Enter") {

      try {
        const data = await fetchWeather(query);
        if (data) {
          setWeather(data.data);
          setQuery("");
        } else {
          setWeather("")
          setError("No Result Found");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="main-container">
      <div className="search__input">
        <SearchIcon className="search__inputIcon" />
        <input
          type="text"
          placeholder="Enter city name"
          ref={searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>

      {weather.main ? (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp) - 273}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="city-icon"
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      ) : (
        <p className="error">{error}</p>
      )}
    </div>
  );
}

export default App;
