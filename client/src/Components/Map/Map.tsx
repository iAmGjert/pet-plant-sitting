import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import mapboxgl from 'mapbox-gl';
// import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import JobPopup from './JobPopup';
import EventPopup from './EventPopup';
// import MapDirections from './MapDirections';


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

  const [buttonPopup, setButtonPopup] = useState(false);
  const [eventButtonPopup, setEventButtonPopup] = useState(false);
  const [jobPopup, setJobPopup] = useState({});
  const [userPopup, setUserPopup] = useState({});
  const [petsPlantsPopup, setPetsPlantsPopup] = useState([]);
  const [eventPopup, setEventPopup] = useState({});
  const [dirCoordinates, setDirCoordinates] = useState([]);

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
      }
    }
    setEventButtonPopup(!eventButtonPopup);
  };

  const geolocateControlRef = useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const mapRef = useRef();
  const nav = new mapboxgl.NavigationControl();
  const directions = new MapboxDirections({
    accessToken: TOKEN
  });

  const getDirections = () => {
    for (let i = 0; i < eventsLocations.length; i++) {
      if (eventsLocations[i][1] === eventPopup.id) {
        axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${userGeoLoc[0]},${userGeoLoc[1]};${eventsLocations[i][0][0]},${eventsLocations[i][0][1]}?geometries=geojson&access_token=${TOKEN}`)
          .then((results) => {
            console.log(results.data, 'RESULTS');
            // setDirCoordinates(results.data.routes[0].geometry.coordinates);
            mapRef?.current.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: results.data.routes[0].geometry.coordinates
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
              }
            });
          });
      }
      setEventButtonPopup(!eventButtonPopup);
    }
  };


  // useEffect(() => {
  //   if (mapRef) {
  //     mapRef?.current.addLayer({
  //       id: 'route',
  //       type: 'line',
  //       source: {
  //         type: 'geojson',
  //         data: dirCoordinates
  //       },
  //       layout: {
  //         'line-join': 'round',
  //         'line-cap': 'round'
  //       },
  //       paint: {
  //         'line-color': '#3887be',
  //         'line-width': 5,
  //         'line-opacity': 0.75
  //       }
  //     });
  //   }
  // }, []);


  return (
    <div>
      <Map
        ref={mapRef}
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
        {
          jobPopup ?
            <JobPopup trigger={buttonPopup} setTrigger={showJobInfo}>
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
              <h5>{`Address: ${jobPopup.location}`}</h5>
            </JobPopup> : ''
        }
        {
          eventPopup ?
            <EventPopup trigger={eventButtonPopup} setTrigger={showEventInfo}>
              <h2>{eventPopup.name}</h2>
              <div
                onClick={getDirections} 
                onKeyPress={getDirections}
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
        <GeolocateControl ref={geolocateControlRef} />
        <NavigationControl />
      </Map> 
    </div>
  );
};


export default MapComponent;
