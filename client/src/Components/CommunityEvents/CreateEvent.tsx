import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import axios from 'axios';
import LoginPrompt from './LoginPrompt';
import { changeView } from '../../state/features/jobs/jobSlice';
import moment from 'moment';



const CreateEvent = () => {
 
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.userProfile.value);
  const eventObj = useAppSelector(state => state.events.event);
  
  //* local state for form values
  const [date, setDate] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
  const [time, setTime] = useState(moment().format('HH:mm'));
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [eventName, setEventName] = useState('');
  const [newEvent, setNewEvent] = useState({});
 
 
  const postEvent = async (event: any) => {
    return await axios.post('/api/events/create', event)
      .then((res: any) => {
        console.log(res);
        return res;
      }).catch(err => {
        console.log(err);
        return err;
      });
  };
  
  const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
    setNewEvent({ ...newEvent, eventName: e.target.value }); 
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, location: e.target.value });
    setLocation(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, description: e.target.value });
    setDescription(e.target.value);
  };
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, startDate: e.target.value });
    setDate(e.target.value);
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, startTime: e.target.value });
    setTime(e.target.value);
  };

  const handleSubmit = () => {
    postEvent({
      host: currentUser.id,
      name: eventName,
      location: location,
      description: description,
      startDate: new Date(date), 
      startTime: time
    });
    dispatch(changeView('list'));
    return;
  };

  return currentUser.name.length ?
    (
      <Form>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput1">
          <Form.Label>Event Name</Form.Label>
          <Form.Control type="text" placeholder="What is the name of your event?"
            onChange={handleEventNameChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput2">
          <Form.Label>Location </Form.Label>
          <Form.Control type="text" placeholder="address" 
            onChange={handleLocationChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="createEventForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" placeholder="describe your event in one or two sentences" rows={3} onChange={handleDescriptionChange}/>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="createEventForm.ControlInput3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" 
                onChange={handleStartDateChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="createEventForm.ControlInput4">
              <Form.Label>Time</Form.Label>
              <Form.Control type='time' onChange={handleTimeChange}/>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    ) : <LoginPrompt/>;
};

export default CreateEvent;
