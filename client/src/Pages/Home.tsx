import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import {
  changeName,
  setUser,
} from '../state/features/userProfile/userProfileSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userProfile.value);
  const handleClick = () => {
    console.log(user);
    dispatch(changeName('steve'));
  };
  return (
    <div>
      <h1>Hello world {user.name}</h1>
      <Link to={'/profile/1'}>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Go to Profile
        </button>
      </Link>
    </div>
  );
};

export default Home;
