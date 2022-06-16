import React, { FC } from 'react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '../state/hooks';
import { mapActions } from '../state/features/map/mapSlice';

import MapComponent from '../Components/Map/Map';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const MapMain: FC<Props> = () => {

  const userLocation: string = useAppSelector((state) => state.map.userLocation);
  const user: object = useAppSelector((state) => state.map.user);
  const job: object = useAppSelector((state) => state.map.job);
  const jobLocation: string = useAppSelector((state) => state.map.jobLocation);
  const dispatch = useAppDispatch();

  const getUserLocation = async () => {
    const options = {
      url: `${process.env.CLIENT_URL}:${process.env.PORT}/auth/login/success`,
      method: 'GET',
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    };
    await axios(options)
      .then((res) => {
        if (res.status === 200) {
          return res;
        }
      })
      .then((resObj) => {
        const id = resObj.data.user.id;
        return id;
      })
      .then((id) => {
        axios.get(`/api/users/${id}`).then((results) => {
          dispatch(mapActions.getUserLocation(results.data.location));
        });
      })
      .catch((err) => {
        console.error(err, 'something went wrong');
      });
  };

  getUserLocation();

  return (
    <div>
      <div>
        <MapComponent />
      </div>
    </div>
  );
};

export default MapMain;
