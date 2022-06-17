import React, { FC, useState, useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from '../../state/hooks';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
// import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  user: object
  userLng: number
  userLat: number
  jobLng: number
  jobLat: number
}
 

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapComponent: FC<Props> = ({ user, userLng, userLat }) => {

  // const location = useAppSelector((state) => state.map.userLocation);
  // const userGeoLng = useAppSelector((state) => state.map.userLocationGeoLng);
  // const userGeoLat = useAppSelector((state) => state.map.userLocationGeoLat);
  // const user = useAppSelector((state) => state.userProfile.value);
  // const job: object = useAppSelector((state) => state.map.job);
  // const jobLocation: string = useAppSelector((state) => state.map.jobLocation);
  // const dispatch = useAppDispatch();
  // const [userLng, setLng] = useState(0);
  // const [userLat, setLat] = useState(0);


  return (
    <div>
      <Map
        initialViewState={{
          longitude: userLng,
          latitude: userLat,
          zoom: 15
        }}
        style={{minHeight: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <Marker 
          longitude={userLng}
          latitude={userLat}
        >
          <button className='mapMarker' ></button>
        </Marker>
      </Map>
    </div>
  );
};


export default MapComponent;
