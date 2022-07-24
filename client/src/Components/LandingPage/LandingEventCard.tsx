import React from 'react';
import moment from 'moment';

//Redux
// import { useAppSelector, useAppDispatch } from '../../state/hooks';
// // Import fetchUpcomingJobs action-creator in order to make that axios call
// const events = useAppSelector((state) => state.events.events);

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

const LandingEventCard = ({
  startDate,
  startTime,
  location,
  description,
  name,
}) => {
  return (
    <Card className='landing-event-card' style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='landing-event-card-title'>{name}</Card.Title>
        <Card.Subtitle className='landing-event-card-date'>
          {moment(startDate).format('dddd, MMMM Do YYYY')}
        </Card.Subtitle>
        <p className='landing-event-card-lines'>----------------</p>
        <Card.Text className='landing-event-card-description'>
          {description}
        </Card.Text>
        <Card.Text className='landing-event-card-startTime'>
          Meets @ {moment(startTime, 'HH:mm:ss').format('LT')}
        </Card.Text>
        <Card.Text className='landing-event-card-location'>
          Location: {location}
        </Card.Text>

        <Card.Link className='landing-event-card-events-link' href='/events'>
          More Upcoming Events
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default LandingEventCard;
