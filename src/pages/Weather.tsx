import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';

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

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const { cityName } = useParams<{ cityName: string }>();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=183105cd3b498796af98511940098406`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, [cityName]);
  console.log(weather)

  return (
    <div>
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default Weather;
