


import React, { /*FC,*/ useEffect, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../state/hooks';
// import { addEvent } from '../state/features/communityEvents/communityEventsSlice';
// import Event from '../Components/CommunityEvents/Event';
import axios from 'axios';
// import { type } from 'os';
type Event = {
  host: number | string;
}
type User = {
  id: number;
  name: string;
}

// interface EventsProps {
//   // children?: React.ReactNode;
// }

const CommunityEventsMain = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);  

  const getEvents = () => {
    axios.get('/api/events/all')
      .then(res => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch(err => console.log(err));
  };

  const getUsers = () => {
    axios.get('/api/users/all')
      .then(res => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(err => console.log(err));  
  };
   
  const handleClick = () => {
    getEvents();
    getUsers();
  };
  
  return (
    <div>
      <h1>Community Events</h1>
      <button onClick={() => handleClick()}>
      Load Events
      </button>
      {
        events.map((event) =>{
          return (
            <div key={event.id}>
              <h3>Event Name: {event.name}</h3>
              <h4>Host: 
                {users.map((user) => user.id === event.host ? ` ${user.name}` : ' unknown')}
              </h4>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              
            </div>
          );
        })
      }
      
    </div>
  );
};


export default CommunityEventsMain;
