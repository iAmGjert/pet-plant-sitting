import React, { useEffect, useState, useRef } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';
 

const TOKEN = 'pk.eyJ1IjoiYmZvcmQwMDIiLCJhIjoiY2w0Zzk2ZG10MDJvNjNpcXNtYjNlcmt2ciJ9.t8WjEpB8YAxJYqTGdClffQ';

const MapComponent = () => {



  return (
    <Map
      initialViewState={{
        longitude: -90.0715,
        latitude: 29.9511,
        zoom: 13
      }}
      style={{minHeight: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={TOKEN}
    />
  );
};

export default MapComponent;
