import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import fetchWeather from "./api/api";
import "./App.css";
const useStyles = makeStyles({
  root: {
    background: "#2193b0" /* fallback for old browsers */,
    background:
      "-webkit-linear-gradient(to right, #6dd5ed, #2193b0)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      " linear-gradient(to right, #6dd5ed, #2193b0)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,

    "border-radius": "999px",
    boxShadow: "#2193b0",
    color: "white",
    height: 48,
    padding: "0 30px",
    "margin-right": "30px",
  },
});
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");
  const searchInput = useRef(null);

  const classes = useStyles();
  useEffect(() => {
    searchInput.current.focus();
  }, [query]);
  const clear = () => {
    setQuery("");
  };
  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        if (!query) {
          setError("Enter some values");
        } else {
          const data = await fetchWeather(query);
          if (data) {
            setWeather(data.data);
          } else {
            setWeather("");
            setError("No Result Found");
          }
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
      <div className="search">
        <Button
          className={classes.root}
          onClick={clear}
          variant="contained"
          color="primary"
        >
          Clear
        </Button>
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
