import React from 'react';
import useState from 'react';
import useEffect from 'react';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

//redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { useSelector } from 'react-redux';
import { getEventListeners } from 'events';
//import { bindActionCreators } from 'redux'; this is what we will import when we have our actions created

const JobCard = ({ startDate, location, bio, image, name, breed }) => {
  //redux hooks
  //const user = useAppSelector(state => state.userProfile.value);
  // const dispatch = useAppDispatch();
  // const state = useSelector((state) => state);
  // console.log(state);

  return (
    <Card className='mb-3' style={{ color: '#000' }}>
      <Card.Header>You have a Sitting!</Card.Header>
      <Card.Img src={image} height='300' width='150' />
      <Card.Body>
        <Card.Title>
          <Card.Text>
            Job for {name}, {breed}
          </Card.Text>
          <Card.Subtitle className='mb-2 text-bold'>{bio}</Card.Subtitle>
          <Card.Subtitle className='mb-4 text-muted'>{location}</Card.Subtitle>
        </Card.Title>
        <Button variant='primary'>Exit</Button>
      </Card.Body>
      <InputGroup size='sm' className='mb-3'>
        <InputGroup.Text id='inputGroup-sizing-sm'>Add Note</InputGroup.Text>
        <FormControl
          aria-label='Small'
          aria-describedby='inputGroup-sizing-sm'
        />
      </InputGroup>
      <Button variant='primary'>Exit</Button>
    </Card>
  );
};
export default JobCard;
