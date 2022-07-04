import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../state/hooks';
import { mapActions } from '../state/features/map/mapSlice';

import MapComponent from '../Components/Map/Map';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapMain: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userProfile.value);
  const jobs = useAppSelector((state) => state.job.jobs);
  const users = useAppSelector((state) => state.map.users);
  const petsPlants = useAppSelector((state) => state.map.petsPlants);
  const events = useAppSelector((state) => state.map.events);
  const navigate = useNavigate();

  const [userGeoLoc, setUserGeoLoc] = useState(null);
  const [jobsLocations, setJobsLocations] = useState([]);
  const [eventsLocations, setEventsLocations] = useState([]);

  const geoCodeUser = () => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${user?.location}.json?access_token=${TOKEN}`)
      .then((results) => {
        setUserGeoLoc(results.data.features[0].center);
      });
  };

  const geoCodeJobs = () => {
    const mapped = jobs.map(async (job) => {
      const promises = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${job.location}.json?access_token=${TOKEN}`);
      return [promises.data.features[0].center, job.id];
    });
    return Promise.all(mapped);
  };

  const geoCodeEvents = () => {
    const mapped = events.map(async (event) => {
      const promises = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.location}.json?access_token=${TOKEN}`);
      return [promises.data.features[0].center, event.id];
    });
    return Promise.all(mapped);
  };

  const getUsers = async () => {
    const users = await axios.get('/api/users/all');
    dispatch(mapActions.setUsers(users.data));
  };

  const getPetsPlants = async () => {
    const petsPlants = await axios.get('/api/pets_plants/all');
    dispatch(mapActions.setPetsPlants(petsPlants.data));
  };

  useEffect(() => {
    if (user && user.location) {
      geoCodeUser();
      geoCodeJobs().then((jobs) => {
        setJobsLocations(jobs);
        dispatch(mapActions.getJobsLocations(jobs));
      });
      geoCodeEvents().then((events) => {
        setEventsLocations(events);
        dispatch(mapActions.getEventsLocations(events));
      });
    }
    getUsers();
    getPetsPlants();
  }, [user]);

  return (
    <div>
      {
        user && user.location && userGeoLoc && eventsLocations.length > 0
          ? <MapComponent 
            user={user}
            users={users}
            petsPlants={petsPlants}
            userGeoLoc={userGeoLoc}
            jobs={jobs}
            jobsLocations={jobsLocations}
            events={events}
            eventsLocations={eventsLocations}
            navigate={navigate}
          />
          : <div>Please log in <button onClick={()=>{ navigate('/login'); }}>Login</button></div>
      }
    </div>
  );
};

export default MapMain;
