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

const JobCard = ({ startDate, location }) => {
  //redux hooks
  //const user = useAppSelector(state => state.userProfile.value);
  // const dispatch = useAppDispatch();
  // const state = useSelector((state) => state);
  // console.log(state);

  return (
    <Card className='mb-3' style={{ color: '#000' }}>
      <Card.Header>You have a Sitting!</Card.Header>
      <Card.Img
        src='https://64.media.tumblr.com/ac3f2698510ef384fdb04620750b228e/25d400665ce53341-ef/s500x750/58c0307cb0fed6a450b04ec559e8a67d99984fbf.jpg'
        height='300'
        width='150'
      />
      <Card.Body>
        <Card.Title>
          Title of Pet/Plant
          <Card.Text></Card.Text>
          <Card.Subtitle className='mb-2 text-bold'>Bio here</Card.Subtitle>
          <Card.Subtitle className='mb-4 text-muted'>
            Location here
          </Card.Subtitle>
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
