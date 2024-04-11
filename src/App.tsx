import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WeatherPage from './components/WeatherPage';

const App: React.FC = () => {
  return (
    <Routes>      
        <Route path="/" element={<Home/>} />
        <Route path="/weather/:cityName" element={<WeatherPage/>} />
    </Routes>
  );
};

export default App;
