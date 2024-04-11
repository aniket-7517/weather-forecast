import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../WeatherCard.css';
import { IoLocation } from "react-icons/io5";
import { CiTempHigh } from "react-icons/ci";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

interface Weather {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

const WeatherCard: React.FC<{ weather: Weather }> = ({ weather }) => {

  const currentdate = new Date();
  const date = currentdate.getDate();
  const month = currentdate.getMonth();
  const monthNames = ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sept", "Auct", "Nov", "Dec"];
  const year = currentdate.getFullYear();
  const hours = currentdate.getHours();
  const minute = currentdate.getMinutes();
 
  return (
    <div className='container'>
      <div className='weather-card'>
        <div className='row'>          
          <div className='col-sm-10'>
            <h4 style={{textDecoration: 'underline' }}><IoLocation /> {weather.name}</h4>
          </div>
          <div className='col-sm-2'>
            <label>{hours} : {minute}</label><br />
            <label>{date} {monthNames[month]} {year}</label>
          </div>
        </div>
        
        <div className='row mt-5'>
          <div className='col-sm'>
            <h5>{weather.main.temp}°C</h5>
            <p>Temperature <CiTempHigh /></p>
          </div>
          <div className='col-sm'>
            <h5>{weather.weather[0].description}</h5>
            <p>Weather <TiWeatherPartlySunny /></p>
          </div>
          <div className='col-sm'>
            <h5>{weather.main.humidity}%</h5>
            <p>Humidity <WiHumidity /></p>
          </div>
          <div className='col-sm'>
            <h5>{weather.wind.speed} m/s</h5>
            <p>Wind Speed <FaWind /></p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const { cityName } = useParams<{ cityName: string }>();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=2f3a314d997fc5bb11a6478bac82ae51`);
        setWeather(response.data);

      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, [cityName]);



  return (
    <div className='container text-center'>
      {weather ? (
        <WeatherCard weather={weather} />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherPage;
