import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { changeName } from '../state/features/userProfile/userProfileSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userProfile.value);
  const handleClick = () => {
    console.log(user);
    dispatch(changeName('Caity'));
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
