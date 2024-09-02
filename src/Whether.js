import React, { useState } from 'react';
import './Whether.css'; 

function Whether() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "296ccc625edc465ebeb111247243108";

  const handleSearch = () => {
    setLoading(true);
    setWeatherData(null);

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.error) {
          alert("Failed to fetch weather data");
        } else {
          setWeatherData(data);
        }
      })
      .catch(error => {
        setLoading(false);
        alert("Failed to fetch weather data");
      });
  };

  return (
    <div className="weather-container">
        <div className="search-bar-container"> 
      <input
        type="text"
        value={loading ? "" : city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City Name"
        className="city-input"
        disabled={loading} 
      />
      <button onClick={handleSearch} className="search-button" disabled={loading}>
        Search
      </button>
      </div>

      {loading && <p className="loading-message">Loading data…</p>}
      
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature</p>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>Humidity</p>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition</p>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed</p>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Whether;
