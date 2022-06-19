import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setEventObj } from '../../state/features/events/eventsSlice';
import axios from 'axios';
import LoginPrompt from './LoginPrompt';
// import { createEvent } from '@testing-library/react';

const CreateEvent = (props: any) => {
  // const { changeView } = props;
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.userProfile.value);
  const eventObj = useAppSelector(state => state.events.event);
  // console.log(currentUser);

  const postEvent = async (eventObjParam: any) => {
    return await axios.post('/api/events/create', eventObjParam)
      .then((res: any) => {
        console.log(res);
        return res;
      }
      ).catch(err => {
        console.log(err);
        return err;
      });
    
  };
  
  const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventObjParam = { ...eventObj };  
    eventObjParam.name = e.target.value;
    dispatch(setEventObj(eventObjParam));
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventObjParam = { ...eventObj };
    eventObjParam.location = e.target.value;
    console.log(eventObjParam);
    console.log(eventObj);
    dispatch(setEventObj(eventObjParam));
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventObjParam = { ...eventObj };
    eventObjParam.description = e.target.value;
    dispatch(setEventObj(eventObjParam));
  };
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventObjParam = { ...eventObj };
    eventObjParam.startDate = new Date(e.target.value);
    dispatch(setEventObj(eventObjParam));
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventObjParam = { ...eventObj };
    eventObjParam.startTime = e.target.value;
    dispatch(setEventObj(eventObjParam));
  };
  
  useEffect(() => {
    const setUserIdToHost = async () => {
      const eventObjParam = { ...eventObj };
      eventObjParam.host = currentUser.id;
      dispatch(setEventObj(eventObjParam));
    };
    setUserIdToHost();
  }, [currentUser, dispatch, eventObj]);



 
  

  // console.log(props);

  // const { id } = currentUser;
  const handleSubmit = () => {
    // createEvent(id, eventObj);
    postEvent(eventObj);
    console.log('Form submitted.');
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
                onChange={(e: any) => console.log(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="createEventForm.ControlInput4">
              <Form.Label>Time</Form.Label>
              <Form.Control type='time' 
                onChange={(e: any) => console.log(new Date(e.target.value))}
              />
              {/* onChange={handleTimeChange}/>  */}
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
