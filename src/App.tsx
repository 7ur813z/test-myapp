import React, { useState } from "react";
import Search from "./Search";
import Words from "./Words";
import Map from "./Map";

const App: React.FC = () => {
  const [receivedLatitude, setReceivedLatitude] = useState(0);
  const [receivedLongitude, setReceivedLongitude] = useState(0);

  const handleDataUpdate = (lat: number, lon: number) => {
    setReceivedLatitude(lat);
    setReceivedLongitude(lon);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Search onDataUpdate={handleDataUpdate} />
      <Words lat={receivedLatitude} lon={receivedLongitude} />
      <Map lat={receivedLatitude} lon={receivedLongitude} />
    </div>
  );
};

export default App;
