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

interface Data {
  lat: number;
  lon: number;
  onWordsUpdate: (words: string) => void;
}

const Words: React.FC<Data> = ({ lat, lon, onWordsUpdate }) => {
  const API_KEY = process.env.REACT_APP_WHAT_THREE_WORDS_API_KEY;

  const userInputProvided = lat !== 0 && lon !== 0;

  const [responseData, setResponseData] = useState<ResponseData | null>(null);

  React.useEffect(() => {
    const generateApiLink = () => {
      const apiUrl =
        "https://api.what3words.com/v3/convert-to-3wa?coordinates=";
      const apiKeyword = "&key=";
      const generatedApiLink = `${apiUrl}${lat}%2C${lon}${apiKeyword}${API_KEY}`;

      axios
        .get<ResponseData>(generatedApiLink)
        .then((response) => {
          setResponseData(response.data);
          onWordsUpdate(response.data.words);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    generateApiLink();
  }, [lat, lon, onWordsUpdate]);

  return userInputProvided ? (
    <div style={{ marginBottom: 5 }}>{responseData?.words}</div>
  ) : null;
};

export default Words;
