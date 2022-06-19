import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { useAppSelector } from '../state/hooks';
// import { mapActions } from '../state/features/map/mapSlice';

import MapComponent from '../Components/Map/Map';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const TOKEN = `${process.env.MAPBOX_TOKEN}`;

const MapMain: FC<Props> = () => {

  const user = useAppSelector((state) => state.userProfile.value);
  const jobs = useAppSelector((state) => state.job.jobs);

  const [userGeoLoc, setUserGeoLoc] = useState(null);
  const [jobsLocations, setJobsLocations] = useState([]);
  

  const geoCodeUser = () => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${user?.location}.json?access_token=${TOKEN}`)
      .then((results) => {
        setUserGeoLoc(results.data.features[0].center);
      });
  };


  const geoCodeJobs = () => {
    const mapped = jobs.map(async (job, id) => {
      const promises = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${job.location}.json?access_token=${TOKEN}`);
      return [promises.data.features[0].center, job.id];
    });
    return Promise.all(mapped);
  };


  useEffect(() => {
    if (user && user.location) {
      geoCodeUser();
      geoCodeJobs().then((jobs) => {
        setJobsLocations(jobs);
      });
    }
  }, [user]);

  

  return (
    <div>
      {
        user && user.location && userGeoLoc
          ? <MapComponent 
            user={user} 
            userGeoLoc={userGeoLoc}
            jobs={jobs}
            jobsLocations={jobsLocations}
          />
          : 'Loading...'
      }
    </div>
  );
};

export default MapMain;
