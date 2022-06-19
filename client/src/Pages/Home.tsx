import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: FC<Props> = () => {
  const [display, setDisplay] = useState(false);
  const user = useAppSelector((state) => state.userProfile.value);
  const users = useAppSelector((state) => state.userProfile.users);
  const petPlants = useAppSelector((state) => state.petPlant.petPlants);
  const jobs = useAppSelector((state) => state.job.jobs);
  const handleClick = () => {
    console.log(user);
    setDisplay(!display);
  };
  return (
    <div>
      <h1>Welcome to Fern Herm{user.name ? `, ${user.name}!` : '!'}</h1>
      <p> Fern-Herm is your one stop shop to find a sitter for your lovely plants and animals while you are too busy to manage! Fern-Herm will help you connect with locals who are willing to help!</p>
      <p>Click the button below for me!</p>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Click
      </button>
      {
        display ? 
          <p>The button just <strong>flop flips</strong> these words and console logs the current user. It can be removed for production.</p> :
          <p>The button just <strong>flip flops</strong> these words and console logs the current user. It can be removed for production.</p>
      }
    </div>
  );
};

export default Home;
