import React from 'react';
import Weather from '../types/Weather';
import './WeatherCard.css';

const WeatherCard: React.FC<{ weather: Weather }> = ({ weather }) => {
  return (
    <div className='container'>
      <div className="row ">
        <p className="temperature">{weather.main.temp}°C</p>
        <p className="weather-description">{weather.weather[0].description}</p>
        <p className="humidity">Humidity: {weather.main.humidity}%</p>
        <p className="wind-speed">Wind Speed: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
