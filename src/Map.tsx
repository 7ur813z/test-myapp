import React, { useState, useEffect } from "react";
import { Viewer, Entity, CameraFlyTo } from "resium";
import { Cartesian3 } from "cesium";
import { Ion } from "cesium";

interface Location {
  lat: number;
  lon: number;
}

const API_KEY: string = process.env.REACT_APP_CESIUM_API_KEY || "";
Ion.defaultAccessToken = API_KEY;

const Map: React.FC<Location> = ({ lat, lon }) => {
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(lon);

  const position = Cartesian3.fromDegrees(longitude, latitude, 200);
  const pointGraphics = { pixelSize: 10 };

  useEffect(() => {
    setLatitude(lat);
    setLongitude(lon);
  }, [lat, lon]);

  return (
    <Viewer>
      <Entity position={position} point={pointGraphics} />
      <CameraFlyTo destination={position} duration={5} />
    </Viewer>
  );
};

export default Map;
