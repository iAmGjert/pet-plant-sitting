import React, { FC } from 'react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '../state/hooks';
import { mapActions } from '../state/features/map/mapSlice';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const MapMain: FC<Props> = () => {

  const mapState: string = useAppSelector((state) => state.map.value);
  console.log(mapState);
  const dispatch = useAppDispatch();


  const getUserLocation = async () => {
    const options = {
      url: 'http://localhost:5000/auth/login/success',
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
        // console.log(resObj.data.user.id, 'RESOBJ');
        const id = resObj.data.user.id;
        return id;
      })
      .then((id) => {
        // console.log(id, 'ID');
        axios
          .get(`http://localhost:5000/api/map/${id}`)
          .then((results) => {
            dispatch(mapActions.getUserLocation(results.data));
            // console.log(results.data, 'RESULTS');
          });
      })
      .catch((err) => {
        console.error(err, 'something went wrong');
      });
  };

  getUserLocation();

  return (
    <div>
      <h1>{mapState}</h1>
    </div>
  );
};

export default MapMain;
