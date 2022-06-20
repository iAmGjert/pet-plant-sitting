import React, { FC, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import JobPopup from './JobPopup';
import EventPopup from './EventPopup';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  user: object
  users: Array<object>
  petsPlants: Array<object>
  userGeoLoc: Array<number>
  jobs: Array<object>
  jobsLocations: any
  eventsLocations: any
  events: Array<object>
}
 

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapComponent: FC<Props> = ({ user, users, petsPlants, userGeoLoc, jobs, jobsLocations, eventsLocations, events }) => {

  const [buttonPopup, setButtonPopup] = useState(false);
  const [eventButtonPopup, setEventButtonPopup] = useState(false);
  const [jobPopup, setJobPopup] = useState({});
  const [userPopup, setUserPopup] = useState({});
  const [petsPlantsPopup, setPetsPlantsPopup] = useState([]);
  const [eventPopup, setEventPopup] = useState({});

  const showJobInfo = (id) => {
    const storage = [];
    for (let i = 0; i < jobs.length; i++) {
      if (id === jobs[i].id) {
        for (let j = 0; j < users.length; j++) {
          if (jobs[i].employer_id === users[j].id) {
            for (let k = 0; k < petsPlants.length; k++) {
              if (jobs[i].pet_plant.length > 0) {
                for (let l = 0; l < jobs[i].pet_plant.length; l++) {
                  if (jobs[i].pet_plant[l] === petsPlants[k].id) {
                    storage.push(petsPlants[k]);
                  }
                  setPetsPlantsPopup(storage);
                }
              }
            }
            setUserPopup(users[j]);
          }
        }
        setJobPopup(jobs[i]);
      }
    }
    setButtonPopup(!buttonPopup);
  };

  const showEventInfo = (id) => {
    for (let i = 0; i < events.length; i++ ) {
      if (id === events[i].id) {
        setEventPopup(events[i]);
        console.log(eventPopup);
      }
    }
    setEventButtonPopup(!eventButtonPopup);
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
          <button >
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
              <button className='mapJobMarker' onClick={() => showJobInfo(job[1])}></button>
            </Marker>;
          })
        }
        {
          eventsLocations.map((event, index) => {
            return <Marker
              longitude={event[0][0]}
              latitude={event[0][1]}
              key={`${event}${index}`}
            >
              <button className='mapEventMarker' onClick={() => showEventInfo(event[1])}></button>
            </Marker>;
          })
        }
        {
          jobPopup ?
            <JobPopup trigger={buttonPopup} setTrigger={showJobInfo}>
              <img src={userPopup.image} alt='' className='popupUserPic'/>
              <h2>{userPopup.name}</h2>
              <h6>Pets/Plants:</h6>
              {
                petsPlantsPopup.length > 0 ? petsPlantsPopup.map((petPlant, index) => {
                  return <img src={petPlant.image} alt='' className='popupPetPlantPic' key={`${petPlant.id}${index}`} />;
                }) : 'No pictures...☹️'
              }
              <h4>{`Start: ${new Date(jobPopup.startDate).toLocaleDateString()}`}</h4>
              <h4>{`End: ${new Date(jobPopup.endDate).toLocaleDateString()}`}</h4>
              <h5>{`Address: ${jobPopup.location}`}</h5>
            </JobPopup> : ''
        }
        {
          eventPopup ?
            <EventPopup trigger={eventButtonPopup} setTrigger={showEventInfo}>
              <h2>{eventPopup.name}</h2>
              <h4>{eventPopup.location}</h4>
              <h6>Host: {eventPopup.user?.name} <img src={eventPopup.user?.image} alt='' className='popupEventProfilePic' /></h6>
              <p>{eventPopup.description}</p>
            </EventPopup> : ''
        }
      </Map> 
    </div>
  );
};


export default MapComponent;
