import React from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

const Details = (props: any) => {
  const dispatch = useAppDispatch();
  const eventObj = useAppSelector((state) => state.events.event);

  const {event_comments, event_participants, user} = eventObj;
  console.log(eventObj);
  return (
    <div>
      <h1>DETAILS PAGE</h1>
      <h3>{eventObj.name}</h3>
      <h3>{user.name}</h3>
    </div>
  );
};

export default Details;
