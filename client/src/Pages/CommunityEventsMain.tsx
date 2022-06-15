/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { communityEventsSlice } from '../state/features/communityEvents/communityEventsSlice';
import Event from '../Components/CommunityEvents/Event';

const CommunityEventsMain = () => {
  // const dispatch = useDispatch();
  // const { communityEvents } = useSelector((state) => state.communityEvents);

  return (
    <div>
      <h1>Community Events</h1>
      <Event />
      {/* <p>{communityEvents}</p> */}
      {/* <button onClick={() => dispatch(communityEventsSlice.actions.fetchCommunityEvents())}>
        Fetch Community Events
      </button> */}
    </div>
  );
};


export default CommunityEventsMain;
