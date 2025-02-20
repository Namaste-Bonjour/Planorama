import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = (location) => {
  return (
      <>
      {/* Markers for each location */}
      {
        <Marker
          position={[location.latitude, location.longitude]}
          icon={new L.Icon({
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41]
          })}
        >
          <Popup>{location.city}</Popup>
        </Marker>
      }
      </>
  );
};

export default MapComponent;