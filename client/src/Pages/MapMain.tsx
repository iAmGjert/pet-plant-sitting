import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '../state/hooks';
// import { mapActions } from '../state/features/map/mapSlice';

import MapComponent from '../Components/Map/Map';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapMain: FC<Props> = () => {

  const user = useAppSelector((state) => state.userProfile.value);
  const jobs = useAppSelector((state) => state.job.jobs);
  // const userLocation: string = useAppSelector((state) => state.map.userLocation);
  // const job: object = useAppSelector((state) => state.map.job);
  // const jobLocation: string = useAppSelector((state) => state.map.jobLocation);
  // const dispatch = useAppDispatch();

  // const [user, setUser] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [jobsLocations, setJobsLocations] = useState([]);

  

  const geoCodeUser = () => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${user?.location}.json?access_token=${TOKEN}`)
      .then((results) => {
        // console.log(results, 'HERE');
        setUserLng(results.data.features[0].center[0]);
        setUserLat(results.data.features[0].center[1]);
        // setInitUser(user);
        // dispatch(mapActions.getUserLocationGeoLng(results.data.features[0].center[0]));
        // dispatch(mapActions.getUserLocationGeoLat(results.data.features[0].center[1]));
      });
  };


  const getJobLocations = () => {
    const mapped = jobs.map(async job => {
      const promises = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${job.location}.json?access_token=${TOKEN}`);
      return promises.data.features[0].center;
    });
    return Promise.all(mapped);
  };


  useEffect(() => {
    if (user && user.location) {
      geoCodeUser();
      getJobLocations().then((jobs) => {
        setJobsLocations(jobs);
      });
    }
  }, [user]);

  // console.log(jobsLocations, 'JOBS');
  

  return (
    <div>
      {
        user && user.location && userLng
          ? <MapComponent user={user} userLng={userLng} userLat={userLat} jobsLocations={jobsLocations} />
          : 'Loading...'
      }
    </div>
  );
};

export default MapMain;
