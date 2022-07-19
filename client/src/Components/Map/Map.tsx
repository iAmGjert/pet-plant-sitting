import React, { FC, useState, useCallback, useEffect, useContext } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, GeolocateControl } from 'react-map-gl';
import axios from 'axios';
import JobPopup from './JobPopup';
import EventPopup from './EventPopup';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { ThemeContext } from '../../App';
import MapDirections from './MapDirections';
import { PersonCircle } from 'react-bootstrap-icons';

interface Props {
  user: object
  users: Array<object>
  petsPlants: Array<object>
  userGeoLoc: Array<number>
  jobs: Array<object>
  jobsLocations: any
  eventsLocations: any
  events: Array<object>
  navigate: any
}

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapComponent: FC<Props> = ({ user, users, petsPlants, userGeoLoc, jobs, jobsLocations, eventsLocations, events, navigate }) => {

  const theme = useContext(ThemeContext);
  const [jobButtonPopup, setJobButtonPopup] = useState(false);
  const [eventButtonPopup, setEventButtonPopup] = useState(false);
  const [geoLocateActive, setGeoLocateActive] = useState(false);
  const [userActiveGeoLon, setUserActiveGeoLon] = useState(null);
  const [userActiveGeoLat, setUserActiveGeoLat] = useState(null);
  const [jobPopup, setJobPopup] = useState({});
  const [userPopup, setUserPopup] = useState({});
  const [distanceFromJob, setDistanceFromJob] = useState(null);
  const [petsPlantsPopup, setPetsPlantsPopup] = useState([]);
  const [eventPopup, setEventPopup] = useState({});
  const [dirCoordinates, setDirCoordinates] = useState([]);
  const [steps, setSteps] = useState([]);
  const [cancelNav, setCancelNav] = useState(false);
  const [showJobsOnly, setShowJobsOnly] = useState(true);
  const [showEventsOnly, setShowEventsOnly] = useState(true);

  
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
                    for (let m = 0; m < jobsLocations.length; m++) {
                      if (jobs[i].id === jobsLocations[m][1]) {
                        if (geoLocateActive) {
                          axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${userActiveGeoLon},${userActiveGeoLat};${jobsLocations[m][0][0]},${jobsLocations[m][0][1]}?steps=true&geometries=geojson&access_token=${TOKEN}`)
                            .then((results) => {
                              setDistanceFromJob((results.data.routes[0].distance / 1609).toFixed(1));
                            });
                        } else {
                          axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${userGeoLoc[0]},${userGeoLoc[1]};${jobsLocations[m][0][0]},${jobsLocations[m][0][1]}?steps=true&geometries=geojson&access_token=${TOKEN}`)
                            .then((results) => {
                              setDistanceFromJob((results.data.routes[0].distance / 1609).toFixed(1));
                            });
                        }
                      }
                    }
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
      setJobButtonPopup(!jobButtonPopup);
    }
  };

  const showEventInfo = (id) => {
    for (let i = 0; i < events.length; i++ ) {
      if (id === events[i].id) {
        setEventPopup(events[i]);
      }
    }
    setEventButtonPopup(!eventButtonPopup);
  };

  const setUserCurrentCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserActiveGeoLon(position.coords.longitude);
      setUserActiveGeoLat(position.coords.latitude);
    });
  };

  const userClicksLocateButton = () => {
    setGeoLocateActive(!geoLocateActive);
  };

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const getEventDirections = () => {
    for (let i = 0; i < eventsLocations.length; i++) {
      if (eventsLocations[i][1] === eventPopup.id) {
        if (geoLocateActive) {
          axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${userActiveGeoLon},${userActiveGeoLat};${eventsLocations[i][0][0]},${eventsLocations[i][0][1]}?steps=true&geometries=geojson&access_token=${TOKEN}`)
            .then((results) => {
              setDirCoordinates(results.data.routes[0].geometry.coordinates);
              setSteps(results.data.routes[0].legs[0].steps);
            });
        } else {
          axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${userGeoLoc[0]},${userGeoLoc[1]};${eventsLocations[i][0][0]},${eventsLocations[i][0][1]}?steps=true&geometries=geojson&access_token=${TOKEN}`)
            .then((results) => {
              setDirCoordinates(results.data.routes[0].geometry.coordinates);
              setSteps(results.data.routes[0].legs[0].steps);
            });
        }
      }
      setEventButtonPopup(!eventButtonPopup);
      setCancelNav(!cancelNav);
    }
  };

  const displayEventsOnly = () => {
    setShowEventsOnly(true);
    setShowJobsOnly(false);
  };
  const displayJobsOnly = () => {
    setShowEventsOnly(false);
    setShowJobsOnly(true);
  };
  const displayAll = () => {
    setShowEventsOnly(true);
    setShowJobsOnly(true);
  };

  useEffect(() => {
    setUserCurrentCoords();
  }, []);

  
  return (
    <div>
      <Map
        initialViewState={{
          longitude: userGeoLoc[0],
          latitude: userGeoLoc[1],
          zoom: 13
        }}
        style={{minHeight: '100vh', position: 'sticky'}}
        mapStyle={theme === 'dark' ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/streets-v9'}
        mapboxAccessToken={TOKEN}
      >
        {
          !cancelNav &&
          <ButtonToolbar>
            <Button onClick={displayAll} className='map-bootstrap-button-all'>All</Button>
            <Button onClick={displayJobsOnly} className='map-bootstrap-button-jobs'>Jobs</Button>
            <Button onClick={displayEventsOnly} className='map-bootstrap-button-events'>Events</Button>
          </ButtonToolbar>
        }
        <Marker 
          longitude={userGeoLoc[0]}
          latitude={userGeoLoc[1]}
          onClick={()=>{ navigate(`/profile/${user?.id}`); }}
        >
          <img src={user.image} alt='X' className='markerPic' />
        </Marker>
        {
          !cancelNav && showJobsOnly &&
          jobsLocations.map((job, index) => {
            return <Marker
              longitude={job[0][0] + .0003}
              latitude={job[0][1] - .0007}
              key={`${job}${index}`}
              offset={[15, -15]}
            >
              <button className='mapJobMarker' onClick={() => showJobInfo(job[1])}></button>
            </Marker>;
          })
        }
        {
          !cancelNav && showEventsOnly &&
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
            <JobPopup trigger={jobButtonPopup} setTrigger={showJobInfo}>
              {
                userPopup.image ?
                  <img src={userPopup.image} alt='' className='popupUserPic'/>
                  : <PersonCircle className='popupUserPic' /> 
              }
              <div 
                onClick={()=>{ navigate(`/profile/${userPopup.id}`); }} 
                onKeyPress={()=>{ navigate(`/profile/${userPopup.id}`); }}
                role='button'
                tabIndex={0}
              >
                <h2>{userPopup.name}</h2>
              </div>
              <h6>Pets/Plants:</h6>
              {
                petsPlantsPopup.length > 0 ? petsPlantsPopup.map((petPlant, index) => {
                  return <img src={petPlant.image} alt='' className='popupPetPlantPic' key={`${petPlant.id}${index}`} />;
                }) : 'No pictures...☹️'
              }
              <h5>{jobPopup.description}</h5>
              <h6>{`Start: ${new Date(jobPopup.startDate).toLocaleDateString()}`}</h6>
              <h6>{`End: ${new Date(jobPopup.endDate).toLocaleDateString()}`}</h6>
              <p>{distanceFromJob} miles from you</p>
            </JobPopup> : ''
        }
        {
          eventPopup ?
            <EventPopup trigger={eventButtonPopup} setTrigger={showEventInfo}>
              <h2>{eventPopup.name}</h2>
              <div
                onClick={getEventDirections} 
                onKeyPress={getEventDirections}
                role='button'
                tabIndex={0}
              >
                <h4>{eventPopup.location}</h4>
              </div>
              <div
                onClick={()=>{ navigate(`/profile/${eventPopup.host}`); }} 
                onKeyPress={()=>{ navigate(`/profile/${eventPopup.host}`); }}
                role='button' 
                tabIndex={0}
              >
                <h6>Host: {eventPopup.user?.name}
                  {
                    eventPopup.user?.image ?
                      <img src={eventPopup.user?.image} alt='' className='popupEventProfilePic' />
                      : <PersonCircle className='popupEventProfilePic' /> 
                  }
                </h6>
              </div>
              <p>{eventPopup.description}</p>
            </EventPopup> : ''
        }
        <GeolocateControl 
          ref={geolocateControlRef}
          onGeolocate={userClicksLocateButton}
          trackUserLocation={true}
          className-='geolocate-button'
        />
        {
          dirCoordinates.length > 0 && cancelNav &&
          <MapDirections steps={steps} dirCoordinates={dirCoordinates} cancelNav={cancelNav} setCancelNav={setCancelNav} />
        }
      </Map>
    </div>
  );
};

export default MapComponent;
