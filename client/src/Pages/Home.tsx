import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { changeName } from '../state/features/userProfile/userProfileSlice';
import { Link } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userProfile.value);
  const handleClick = () => {
    console.log(user);
    console.log('You clicked me!');
    dispatch(changeName("Iben O'Neal"));
  };
  return (
    <div>
      <h1>Hello world {user.name}</h1>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Click
      </button>
    </div>
  );
};

export default Home;
