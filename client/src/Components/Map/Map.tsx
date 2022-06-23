import React, { FC, useState, useCallback, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, GeolocateControl, Layer, Source, Popup } from 'react-map-gl';
import axios from 'axios';
import JobPopup from './JobPopup';
import EventPopup from './EventPopup';
import { ListGroup } from 'react-bootstrap';


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
  navigate: any
}
 

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapComponent: FC<Props> = ({ user, users, petsPlants, userGeoLoc, jobs, jobsLocations, eventsLocations, events, navigate }) => {

  const [jobButtonPopup, setJobButtonPopup] = useState(false);
  const [eventButtonPopup, setEventButtonPopup] = useState(false);
  // const [smallJobPopup, setSmallJobPopup] = useState(false);
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
        if (geoLocateActive) {
          axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${userActiveGeoLon},${userActiveGeoLat};${jobsLocations[jobs[i].id - 1][0][0]},${jobsLocations[jobs[i].id - 1][0][1]}?steps=true&geometries=geojson&access_token=${TOKEN}`)
            .then((results) => {
              setDistanceFromJob((results.data.routes[0].distance / 1609).toFixed(1));
            });
        }
        axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${userGeoLoc[0]},${userGeoLoc[1]};${jobsLocations[jobs[i].id - 1][0][0]},${jobsLocations[jobs[i].id - 1][0][1]}?steps=true&geometries=geojson&access_token=${TOKEN}`)
          .then((results) => {
            setDistanceFromJob((results.data.routes[0].distance / 1609).toFixed(1));
          });
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
      console.log(position.coords);
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
    }
  };

  const directions = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: dirCoordinates
    }
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
        style={{minHeight: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <Marker 
          longitude={userGeoLoc[0]}
          latitude={userGeoLoc[1]}
        >
          <button onClick={()=>{ navigate(`/profile/${user?.id}`); }} >
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
        {/* {
          smallJobPopup &&
          <Popup
            longitude={}
            latitude={}
          >

          </Popup>
        } */}
        {
          jobPopup ?
            <JobPopup trigger={jobButtonPopup} setTrigger={showJobInfo}>
              <img src={userPopup.image} alt='' className='popupUserPic'/>
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
              <h4>{`Start: ${new Date(jobPopup.startDate).toLocaleDateString()}`}</h4>
              <h4>{`End: ${new Date(jobPopup.endDate).toLocaleDateString()}`}</h4>
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
                <h6>Host: {eventPopup.user?.name} <img src={eventPopup.user?.image} alt='' className='popupEventProfilePic' /></h6>
              </div>
              <p>{eventPopup.description}</p>
            </EventPopup> : ''
        }
        <GeolocateControl 
          ref={geolocateControlRef}
          onGeolocate={userClicksLocateButton}
        />
        {
          dirCoordinates.length > 0 &&
        <Source id="polylineLayer" type="geojson" data={directions}>
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
            }}
          />
        </Source>
        }
        {
          steps.length > 0 &&
          <ListGroup variant='flush' as='ol' className='step-instructions' numbered>
            {
              steps.map((step, i) => {
                return <ListGroup.Item as='li'
                  key={`${step}${i}`}
                >
                  {step.maneuver.instruction}
                </ListGroup.Item>;
              })
            }
          </ListGroup>
        }
      </Map>
    </div>
  );
};

export default MapComponent;
