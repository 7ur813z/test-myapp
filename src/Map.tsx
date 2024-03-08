import React, { useState, useEffect } from "react";
import { Viewer, Entity, CameraFlyTo, EntityDescription } from "resium";
import { Ion } from "cesium";

import { Cartesian3 } from "cesium";

interface Location {
  lat: number;
  lon: number;
}

const API_KEY: string = process.env.REACT_APP_CESIUM_API_KEY || "";
Ion.defaultAccessToken = API_KEY;

const Map: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(lon);

  const userInputProvided = lat !== 0 && lon !== 0;

  const position = Cartesian3.fromDegrees(longitude, latitude, 200);
  const pointGraphics = { pixelSize: 10 };

  const dummyCredit = document.createElement("div");

  useEffect(() => {
    setLatitude(lat);
    setLongitude(lon);
  }, [lat, lon]);

  return (
    <Viewer
      style={{
        width: "45vw",
        height: "45vw",
      }}
      animation={false}
      timeline={false}
      fullscreenButton={false}
      navigationHelpButton={false}
      sceneModePicker={false}
      homeButton={false}
      geocoder={false}
      creditContainer={dummyCredit}
      baseLayer={false}
    >
      {userInputProvided && (
        <Entity position={position} point={pointGraphics} name="Tokyo" />
      )}

      {userInputProvided && <CameraFlyTo destination={position} duration={5} />}

      {userInputProvided && (
        <EntityDescription>
          <h1>Hello, world.</h1>
        </EntityDescription>
      )}
    </Viewer>
  );
};

export default Map;
