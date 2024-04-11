import React, { useState } from 'react';
import axios from 'axios';

const Autocomplete: React.FC<{ onSelected: (cityName: string) => void }> = ({ onSelected }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=10&q=${query}`
      );
      const cities = response.data.records.map((city: any) => city.fields.name);
      setOptions(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleSelect = (option: string) => {
    setSearchTerm(option);
    onSelected(option);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      <ul>
        {options.map((option) => (
          <li key={option} onClick={() => handleSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
