/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { addEvent } from '../state/features/communityEvents/communityEventsSlice';
import Event from '../Components/CommunityEvents/Event';


const CommunityEventsMain = () => {
  const { events } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();
  console.log(events);
  const handleClick = () => {
    console.log('You clicked me!');
    dispatch(addEvent());
  };
  return (
    <div>
      <h1>Community Events</h1>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Click Me!
      </button>
      <Event />
      
    </div>
  );
};


export default CommunityEventsMain;
