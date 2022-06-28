import React from 'react';
//import * as moment from 'moment';

//Redux
// import { useAppSelector, useAppDispatch } from '../../state/hooks';
// // Import fetchUpcomingJobs action-creator in order to make that axios call
// const events = useAppSelector((state) => state.events.events);

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import moment from 'moment';

const LandingEventCard = ({ startDate, location, description, name }) => {
  return (
    <Card className='bootstrap-card' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {moment(startDate).format('dddd, MMMM Do YYYY')}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Meets at {location}</Card.Text>
        <Card.Link href='/events'>More Upcoming Events</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default LandingEventCard;
