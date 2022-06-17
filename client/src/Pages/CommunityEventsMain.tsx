import React, { /*FC,*/ useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../state/hooks';

import { getEvents, getView, setView, setEvents } from '../state/features/events/eventsSlice';
import Event from '../Components/CommunityEvents/Event';

interface EventTYPE {
  id: number;
  name: string;
  host: number;
  location: string;
  description: string;
  event_comments: /*string[];*/ Array<{ 
    id: number; 
    comment: string; 
    user: {
      name: string;
      image: string;
    }}>;
    event_participants: Array<{ 
    id: number; 
    user: {
      name: string;
      image: string;
    }}>;
  startDate: Date;
  endDate: Date;
  startTime: Date;
  user: {
    name: string;
    image: string;
  }
}

const CommunityEventsMain = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector(state => state.events.view);
  const events = useAppSelector(state => state.events.events);


  console.log(events);
  useEffect(() => {
    const getEvents = async () => {
      const res = await axios.get('/api/events/all');
      return dispatch(setEvents(res.data)); // set events to state
    };
    getEvents();
  }, [dispatch]);

   
  // const handleClick = () => {
  //   if (view !== 'create') {
  //     dispatch(setView('create'));
  //     return;
  //   }
  //   dispatch(setView('list'));
  // };
  
  return (
    <div>
      <h1>Community Events</h1>
      {/* <button onClick={() => getEvents()}>
      Log Events
      </button> */}
      { view === 'list' && Array.isArray(events) ? events.map((event: EventTYPE) => (
        <Event key={event.id} 
          name={event.name}
          host={event.host}
          location={event.location}
          description={event.description}
          comments={event.event_comments}
          participants={event.event_participants}
          startDate={event.startDate}
          endDate={event.endDate}
          startTime={event.startTime}
          user={event.user}
        />
      )) : <div> </div> }
       
      
      
      
    </div>
  );
};


export default CommunityEventsMain;
