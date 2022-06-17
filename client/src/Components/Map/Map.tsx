import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  user: object
  lng: number
  lat: number
}
 

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapComponent: FC<Props> = ({ user, lng, lat }) => {

  // const location = useAppSelector((state) => state.map.userLocation);
  // const userGeoLng = useAppSelector((state) => state.map.userLocationGeoLng);
  // const userGeoLat = useAppSelector((state) => state.map.userLocationGeoLat);
  // const user = useAppSelector((state) => state.userProfile.value);
  // const job: object = useAppSelector((state) => state.map.job);
  // const jobLocation: string = useAppSelector((state) => state.map.jobLocation);
  // const dispatch = useAppDispatch();
  // const [lng, setLng] = useState(0);
  // const [lat, setLat] = useState(0);


  return (
    <div>
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15
        }}
        style={{minHeight: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
      </Map>
    </div>
  );
};


export default MapComponent;
