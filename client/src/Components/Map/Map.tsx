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
  jobsLocations: Array<number>
}
 

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapComponent: FC<Props> = ({ user, userLng, userLat, jobsLocations }) => {
  
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
          <button className='mapMarker' >
            <img src={user.image} alt='X' className='markerPic' />
          </button>
        </Marker>
        {
          jobsLocations.map((job, index) => {
            return <Marker
              longitude={job[0]}
              latitude={job[1]}
              key={`${job}${index}`}
            >
              <button className='mapMarker'></button>
            </Marker>;
          })
        }
      </Map>
    </div>
  );
};


export default MapComponent;
