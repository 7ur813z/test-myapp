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
  onLocationUpdate: (lat: number, lon: number) => void;
}

const Search: React.FC<ChildProps> = ({ onLocationUpdate }) => {
  const API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;

  const [location, setLocation] = useState("");

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const getLocationData = () => {
    const apiUrl = "https://geocode.maps.co/search?q=";
    const apiKeyword = "&api_key=";
    const formattedValue = location.replace(/\s/g, "+");
    const generatedApiLink = `${apiUrl}${formattedValue}${apiKeyword}${API_KEY}`;

    axios
      .get<Location[]>(generatedApiLink)
      .then((response) => {
        const responseData = response.data;
        if (responseData.length > 0) {
          const { lat, lon } = responseData[0];
          onLocationUpdate(parseFloat(lat), parseFloat(lon));
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
          fontFamily: "Verdana",
        }}
      >
        TestCarta
      </h1>
      <div style={{ marginBottom: 5 }}>
        <input
          id="1"
          name="input"
          type="text"
          value={location}
          onChange={handleChangeInput}
          placeholder="Enter a postal address"
        />

        <button onClick={getLocationData}>Search</button>
      </div>
    </div>
  );
};

export default Search;
