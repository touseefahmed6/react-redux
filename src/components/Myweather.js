import React, { useState, useEffect } from 'react';
import './Style.css';

const Myweather = () => {
  const [temperature, setTemperature] = useState(0);
  const [unit, setUnit] = useState('celsius');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get geolocation data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'a7de70f84635522ea719090bdb92750a'; // Replace with your OpenWeatherMap API key

        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          );

          if (response.ok) {
            const data = await response.json();
            setWeatherData(data);
            setTemperature(data.main.temp - 273.15); // Convert temperature to Celsius
            setLoading(false);
          } else {
            console.error('Error fetching weather data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    } else {
      console.error('Geolocation not available');
    }
  }, []);

  const toggleUnit = () => {
    if (unit === 'celsius') {
      setUnit('fahrenheit');
      setTemperature((temperature * 9) / 5 + 32);
    } else {
      setUnit('celsius');
      setTemperature((temperature - 32) * (5 / 9));
    }
  };

  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <form className="d-flex">
            <input className="form-control me-2 searchBar" type="search" placeholder="Enter Your City" aria-label="Search" />
            <button className="btn btn-outline-success searchBtn" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="wrapper">
        <div className="widget-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="top-left">
                <h1 className="city">
                  {weatherData.name}, {weatherData.sys.country}
                </h1>
                <h2 id="day">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</h2>
                <h3 id="date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                <h3 id="time">{new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</h3>
                <p className="geo">
                  Latitude: {weatherData.coord.lat}, Longitude: {weatherData.coord.lon}
                </p>
              </div>
              <div className="top-right">
                <h1 id="weather-status">
                  {weatherData.weather[0].main} / {weatherData.weather[0].description}
                </h1>
                <img
                  className="weather-icon"
                  src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </div>
              <div className="horizontal-half-divider"></div>
              <div className="bottom-left">
                <h1 id="temperature">{Math.round(temperature)}&deg;{unit.toUpperCase()}</h1>
                <button id="temp-toggle" onClick={toggleUnit}>
                  Toggle Unit
                </button>
              </div>
              <div className="vertical-half-divider"></div>
              <div className="bottom-right">
                <div className="other-details-key">
                  <p>Wind Speed</p>
                  <p>Humidity</p>
                  <p>Pressure</p>
                  <p>Sunrise Time</p>
                  <p>Sunset Time</p>
                </div>
                <div className="other-details-values">
                  <p className="windspeed">{weatherData.wind.speed} Km/h</p>
                  <p className="humidity">{weatherData.main.humidity} %</p>
                  <p className="pressure">{weatherData.main.pressure} hPa</p>
                  <p className="sunrise-time">
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                  </p>
                  <p className="sunset-time">
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myweather;
