import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { changeName } from '../state/features/userProfile/userProfileSlice';

// interface Props {}

const Home: FC = () => {
  const userName = useAppSelector((state) => state.userProfile.value);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    console.log('You clicked me!');
    dispatch(changeName('Iben ONeal'));
  };
  return (
    <div>
      <h1>Hello world {userName}</h1>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Click Me!
      </button>
    </div>
  );
};

export default Home;
