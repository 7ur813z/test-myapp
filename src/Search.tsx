import React, { useState } from "react";
import axios from "axios";

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

interface ChildProps {
  onDataUpdate: (lat: number, lon: number) => void;
}

const API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;

const Search: React.FC<ChildProps> = ({ onDataUpdate }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const generateApiLink = () => {
    const apiUrl = "https://geocode.maps.co/search?q=";
    const apiKeyword = "&api_key=";
    const formattedValue = inputValue.replace(/\s/g, "+");
    const generatedApiLink = `${apiUrl}${formattedValue}${apiKeyword}${API_KEY}`;

    axios
      .get<Location[]>(generatedApiLink)
      .then((response) => {
        const responseData = response.data;
        if (responseData.length > 0) {
          const { lat, lon } = responseData[0];
          onDataUpdate(parseFloat(lat), parseFloat(lon));
        } else {
          console.error("No data found in the API response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <h1
        style={{
          marginTop: "5px",
          marginBottom: "5px",
          textAlign: "center",
        }}
      >
        TestCarta
      </h1>
      <div style={{ marginBottom: 5 }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a postal address"
        />

        <button onClick={generateApiLink}>Search</button>
      </div>
    </div>
  );
};

export default Search;
