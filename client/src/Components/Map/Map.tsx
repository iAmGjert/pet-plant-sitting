import React, { FC } from 'react';
import { connect } from 'react-redux';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapComponent: FC<Props> = (props) => {
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

const mapStateToProps = (state: any, ownProps: { location: any }) => {
  return {
    location: ownProps.location,
  };
};

export default connect(mapStateToProps)(MapComponent);
