import { Viewer, Entity } from "resium";
import { Ion } from "cesium";
import { Cartesian3 } from "cesium";
import {  GeoJsonDataSource, KmlDataSource } from "resium";

const API_KEY: string = process.env.REACT_APP_CESIUM_API_KEY || '';
const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
const pointGraphics = { pixelSize: 10 };

Ion.defaultAccessToken = API_KEY;

const data = {
    type: "Feature",
    properties: {
      name: "Coors Field",
      amenity: "Baseball Stadium",
      popupContent: "This is where the Rockies play!",
    },
    geometry: {
      type: "Point",
      coordinates: [-104.99404, 39.75621],
    },
  };

const Map = () => {
  return (
    <Viewer>
        <GeoJsonDataSource data={data} />
  </Viewer>
  );
}

export default Map;