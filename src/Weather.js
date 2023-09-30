import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { apiKey } from "./config";
import "./WeatherStyles.css";
const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [err, setErr] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = () => {
    if (!city) {
      setWeatherData(null);
      setErr("Please enter a valid city name.");
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setErr(null); // Clear any previous error
      })
      .catch((error) => {
        setWeatherData(null);
        setErr("Do you think this place exists?"); // Set the error message
      });
  };

  return (
    <div className="c0">
      <div className="c1">
        <div className="c2">
          <input
            type="text"
            placeholder="Enter Your City"
            value={city}
            onChange={handleCityChange}
            className="c3"
          />
          <Button onClick={handleClick} className="c4">
            Search
          </Button>
        </div>
        {err && <p className="c5">{err}</p>}
        {weatherData && (
          <div className="c6">
            <h2>◆ {weatherData.name} ◆</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
