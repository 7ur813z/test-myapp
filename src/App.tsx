import React, { useState } from 'react';
import axios from 'axios';

interface Location {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

const API_KEY = process.env.REACT_APP_API_KEY;

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [apiLink, setApiLink] = useState('');
  
  const [responseData, setResponseData] = useState<Location[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const generateApiLink = () => {
    const apiUrl = 'https://geocode.maps.co/search?q=';
    const apiKeyword = '&api_key=';
    const formattedValue = inputValue.replace(/\s/g, '+');
    const generatedApiLink = `${apiUrl}${formattedValue}${apiKeyword}${API_KEY}`;
    setApiLink(generatedApiLink);

    axios.get<Location[]>(generatedApiLink)
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a postal address"
      />
      <button onClick={generateApiLink}>Search</button>
      <ul>
        {responseData.map((location) => (
          <li key={location.place_id}>
            <h2>{location.display_name}</h2>
            <p>{location.lat}</p>
            <p>{location.lon}</p>
          </li>
        ))}
        </ul>
    </div>
  );
};

export default App;
