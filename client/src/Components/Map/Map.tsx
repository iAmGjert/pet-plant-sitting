import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapComponent: FC<Props> = () => {

  const location = useAppSelector((state) => state.map.userLocation);
  const user: object = useAppSelector((state) => state.map.user);
  const job: object = useAppSelector((state) => state.map.job);
  const jobLocation: string = useAppSelector((state) => state.map.jobLocation);
  const dispatch = useAppDispatch();


  return (
    <Map
      initialViewState={{
        longitude: -90.0715,
        latitude: 29.9511,
        zoom: 13,
      }}
      style={{ minHeight: '100vh' }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
      mapboxAccessToken={TOKEN}
    />
  );
};


export default MapComponent;
