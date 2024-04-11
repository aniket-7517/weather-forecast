import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { City } from '../types/City';
import { Link } from 'react-router-dom';

const CityTable: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const tableRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    setCities([]);
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=20&start=${(page - 1) * 20}&q=${searchQuery}`
        );
        setCities((prevCities) => [...prevCities, ...response.data.records]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const handleScroll = () => {
    if (
      tableRef.current &&
      tableRef.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='container'>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
          <th className='ps-4'>#</th>
            <th className='ps-4'>City Name</th>
            <th className='ps-5'>Country</th>
            <th className='ps-5'>Timezone</th>
          </tr>
        </thead>
        <tbody ref={tableRef}>
          {cities.map((city, index) => (
            <tr key={index}>
              <td className='ps-4'>{index + 1}</td>
              <td className='ps-4'>
                <Link style={{textDecoration : "none", color : "black"}} to={`/weather/${city.fields.name}`}>
                  {city.fields.name}
                </Link>
              </td>
              <td className='ps-5'>{city.fields.label_en}</td>
              <td className='ps-5'>{city.fields.timezone}</td>
            </tr>
          ))}
          {loading && (
            <tr>
              <td colSpan={3} className='text-center'>
                <p>Loading...</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;
