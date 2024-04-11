import React, { useState } from 'react';
import CityTable from '../components/CityTable';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <div className="mb-3 col-sm-5 container mt-3">
        <input type="text" value={searchQuery} className="form-control" onChange={(e) => setSearchQuery(e.target.value)} id="searchCity" placeholder="Search city..." />
      </div>
      <CityTable searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
