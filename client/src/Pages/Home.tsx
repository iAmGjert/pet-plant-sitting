import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { changeName } from '../state/features/userProfile/userProfileSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const [display, setDisplay] = useState(false);
  const user = useAppSelector((state) => state.userProfile.value);
  const handleClick = () => {
    console.log(user);
    setDisplay(!display);
  };
  return (
    <div>
      <h1>Welcome, {user.name ? user.name : 'Guest'}, to Fern-Herm!</h1>
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
          <p>The button just <strong>flop flips</strong> the information displayed on the screen at this line.</p> :
          <p>The button just <strong>flip flops</strong> the information displayed on the screen at this line.</p>
      }
      <p>You will also console.log your user when you click the button!</p>
    </div>
  );
};

export default Home;
