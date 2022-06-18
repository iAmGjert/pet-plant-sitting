import React, { FC, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../../state/hooks';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import JobPopup from './JobPopup';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  user: object
  userGeoLoc: Array<number>
  jobs: Array<object>
  jobsLocations: any
}
 

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapComponent: FC<Props> = ({ user, userGeoLoc, jobs, jobsLocations, }) => {

  const [buttonPopup, setButtonPopup] = useState(false);
  const [jobPopup, setJobPopup] = useState({});

  const showJobInfo = (id) => {
    for (let i = 0; i < jobs.length; i++) {
      if (id === jobs[i].id) {
        setJobPopup(jobs[i]);
      }
    }
    setButtonPopup(!buttonPopup);
  };
  
  return (
    <div>
      <Map
        initialViewState={{
          longitude: userGeoLoc[0],
          latitude: userGeoLoc[1],
          zoom: 15
        }}
        style={{minHeight: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <Marker 
          longitude={userGeoLoc[0]}
          latitude={userGeoLoc[1]}
        >
          <button className='mapMarker' >
            <img src={user.image} alt='X' className='markerPic' />
          </button>
        </Marker>
        {
          jobsLocations.map((job, index) => {
            return <Marker
              longitude={job[0][0]}
              latitude={job[0][1]}
              key={`${job}${index}`}
            >
              <button className='mapMarker' onClick={() => showJobInfo(job[1])}></button>
            </Marker>;
          })
        }
        {
          jobPopup ?
            <JobPopup trigger={buttonPopup} setTrigger={showJobInfo}>
              <h2>{jobPopup.employer_id}</h2>
              <h3>{`Pets/Plant: ${jobPopup.pet_plant}`}</h3>
              <h4>{`Start: ${jobPopup.startDate}`}</h4>
              <h4>{`End: ${jobPopup.endDate}`}</h4>
              <h5>{`Address: ${jobPopup.location}`}</h5>
            </JobPopup> : ''
        }
      </Map> 
    </div>
  );
};


export default MapComponent;
