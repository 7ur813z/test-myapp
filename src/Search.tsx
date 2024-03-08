import React, { useState } from "react";
import axios from "axios";
import Map from "./Map";
import Words from "./Words";

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

const API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;

const Search = () => {
  const [inputValue, setInputValue] = useState("");

  const [apiLink, setApiLink] = useState("");

  const [responseData, setResponseData] = useState<Location[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const generateApiLink = () => {
    const apiUrl = "https://geocode.maps.co/search?q=";
    const apiKeyword = "&api_key=";
    const formattedValue = inputValue.replace(/\s/g, "+");
    const generatedApiLink = `${apiUrl}${formattedValue}${apiKeyword}${API_KEY}`;
    setApiLink(generatedApiLink);

    axios
      .get<Location[]>(generatedApiLink)
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          marginTop: "5px",
          marginBottom: "5px",
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
      <Words
        lat={responseData[0] ? parseFloat(responseData[0].lat) : 0}
        lon={responseData[0] ? parseFloat(responseData[0].lon) : 0}
      />
      <Map
        lat={responseData[0] ? parseFloat(responseData[0].lat) : 0}
        lon={responseData[0] ? parseFloat(responseData[0].lon) : 0}
      />
    </div>
  );
};

export default Search;
