import React, { FC } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Layer, Source } from 'react-map-gl';


interface Props {
  steps: any
  dirCoordinates: Array<number>
  cancelNav: boolean
  setCancelNav: any
}

const MapDirections: FC<Props> = ({ steps, dirCoordinates, cancelNav, setCancelNav }) => {

  const directions = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: dirCoordinates
    }
  };

  return (
    <div>
      {
        cancelNav &&
        <><Source id="polylineLayer" type="geojson" data={directions}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              'line-join': 'round',
              'line-cap': 'round'
            }}
            paint={{
              'line-color': 'darkblue',
              'line-width': 7
            }} />
        </Source><ListGroup variant='flush' as='ol' className='step-instructions' numbered>
          <Button className='bootstrap-button' onClick={() => setCancelNav(!cancelNav)}>End Route</Button>
          {steps.map((step, i) => {
            return <ListGroup.Item as='li'
              key={`${step}${i}`}
              className='step-instructions-card'
            >
              {step.maneuver.instruction}
            </ListGroup.Item>;
          })}
        </ListGroup></>
      }
    </div>
  );
};

export default MapDirections;
