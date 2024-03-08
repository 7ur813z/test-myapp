import React, { useState } from "react";
import axios from "axios";

interface Coordinates {
  lng: number;
  lat: number;
}

interface Square {
  southwest: Coordinates;
  northeast: Coordinates;
}

interface ResponseData {
  country: string;
  square: Square;
  nearestPlace: string;
  coordinates: Coordinates;
  words: string;
  language: string;
  map: string;
}

interface Location {
  lat: number;
  lon: number;
}

const API_KEY = process.env.REACT_APP_WHAT_THREE_WORDS_API_KEY;

const Words: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
  const userInputProvided = lat !== 0 && lon !== 0;
  const [apiLink, setApiLink] = useState("");

  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  const generateApiLink = () => {
    const apiUrl = "https://api.what3words.com/v3/convert-to-3wa?coordinates=";
    const apiKeyword = "&key=";
    const generatedApiLink = `${apiUrl}${lat}%2C${lon}${apiKeyword}${API_KEY}`;
    setApiLink(generatedApiLink);

    axios
      .get<ResponseData>(generatedApiLink)
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  React.useEffect(() => {
    generateApiLink();
  }, [lat, lon]);

  return userInputProvided ? (
    <div style={{ marginBottom: 5 }}>{responseData?.words}</div>
  ) : null;
};

export default Words;
