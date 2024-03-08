import React, { useState } from "react";
import Search from "./Search";
import Words from "./Words";
import Map from "./Map";

const App: React.FC = () => {
  const [receivedLatitude, setReceivedLatitude] = useState(0);

  const [receivedLongitude, setReceivedLongitude] = useState(0);

  const [receivedWords, setReceivedWords] = useState("");

  const handleLocationUpdate = (lat: number, lon: number) => {
    setReceivedLatitude(lat);

    setReceivedLongitude(lon);
  };

  const handleWordsUpdate = (words: string) => {
    setReceivedWords(words);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Search onLocationUpdate={handleLocationUpdate} />

      <Words
        lat={receivedLatitude}
        lon={receivedLongitude}
        onWordsUpdate={handleWordsUpdate}
      />

      <Map
        lat={receivedLatitude}
        lon={receivedLongitude}
        words={receivedWords}
      />
    </div>
  );
};

export default App;
