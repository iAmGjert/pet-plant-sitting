import React, { useEffect, useState, useRef } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL from 'react-map-gl';
 



const Map = () => {

  const API = 'sk.eyJ1IjoiYmZvcmQwMDIiLCJhIjoiY2w0Zzlma3RoMDEzMjNobnhoMDRlMmI5NiJ9.2hbTzPUj1vY_uApj0WpSkA';

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 38.958630,
    longitude: -77.357002,
    zoom: 10
  });


  return (
    <div>
      <ReactMapGL { ...viewport }
        mapboxAccessToken={API}></ReactMapGL>
    </div>
  );
};

export default Map;
