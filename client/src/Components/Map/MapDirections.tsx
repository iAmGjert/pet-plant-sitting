import axios from 'axios';
import React from 'react';
import { NavigationControl } from 'react-map-gl';


const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapDirections = () => {

  const getDirections = () => {
    axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=${TOKEN}`)
      .then((results) => {
        console.log(results, 'RESULTS');
      });
  };

  getDirections();


  return (
    <NavigationControl
      position='top-right'
    >HELLOOOOOOO</NavigationControl>
  );
};

export default MapDirections;
