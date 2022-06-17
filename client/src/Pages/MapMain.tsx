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
  // const userLocation: string = useAppSelector((state) => state.map.userLocation);
  // const job: object = useAppSelector((state) => state.map.job);
  // const jobLocation: string = useAppSelector((state) => state.map.jobLocation);
  // const dispatch = useAppDispatch();

  // const [user, setUser] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [jobLng, setJobLng] = useState(null);
  const [jobLat, setJobLat] = useState(null);


  // const getUserInfo = () => {
  //   axios.get('/api/map/user')
  //     .then((results) => {
  //       setUser(results.data[0]);
  //     })
  //     .then(() => {
  //       // setRender(true);
  //     })
  //     .catch((err) => {
  //       console.error(err, 'something went wrong');
  //     });
  // };
  

  const geoCodeUser = () => {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${user?.location}.json?access_token=${TOKEN}`)
      .then((results) => {
        console.log(results, 'HERE');
        setUserLng(results.data.features[0].center[0]);
        setUserLat(results.data.features[0].center[1]);
        // setInitUser(user);
        // dispatch(mapActions.getUserLocationGeoLng(results.data.features[0].center[0]));
        // dispatch(mapActions.getUserLocationGeoLat(results.data.features[0].center[1]));
      });
  };

  useEffect(() => {
    console.log('render1');
    if (user && user.location) {
      geoCodeUser();
    }
  }, [user]);


  

  return (
    <div>
      {
        user && user.location && userLng
          ? <MapComponent user={user} userLng={userLng} userLat={userLat} jobLng={jobLng} jobLat={jobLat} />
          : 'Loading...'
      }
    </div>
  );
};

export default MapMain;
