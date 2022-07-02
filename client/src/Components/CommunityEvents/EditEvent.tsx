import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { /*selectEventById,*/ updateEvent, deleteEvent } from '../../state/features/events/eventsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';


const EditEvent = () => {
  // const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const event = useAppSelector(state => state.events.event);
  const currentUser = useAppSelector(state => state.userProfile.value);

  //* local state for form values
  const [eventName, setEventName] = useState(event?.name);
  const [location, setLocation] = useState(event?.location);
  const [description, setDescription] = useState(event?.description);
  const [date, setDate] = useState(moment(event?.startDate).add(1, 'days').format('YYYY-MM-DD'));
  const [time, setTime] = useState(moment(event?.startTime).format('HH:mm'));
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  if (!event) {
    return <h1>Event not found</h1>;
  }

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setEventName(e.target.value);
  const onLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value);
  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const onStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value);
  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value);

  const canSubmit = !!location && !!description && !!eventName && addRequestStatus === 'idle';
  const handleUpdate = () => {
    if (canSubmit) {
      try {
        setAddRequestStatus('pending');
        dispatch(updateEvent({
          id: event.id,
          name: eventName,
          location: location,
          description: description,
          startDate: new Date(date),
          startTime: time,
          host: currentUser.id,
          user: {
            name: currentUser.name,
            id: currentUser.id,
          }
        })).unwrap();
        navigate('/events');
      } catch (error) {
        console.error('Failed to save event', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${event.name}?`)) {
      try {
        setAddRequestStatus('pending');
        dispatch(deleteEvent(event.id)).unwrap();
        navigate('/events');
      } catch (error) {
        console.error('Failed to delete event', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };


  return (
    <Form>
      <Form.Group className="mb-3" controlId="createEventForm.ControlInput1">
        <Form.Label>Event Name</Form.Label>
        <Form.Control type="text" value={eventName} onChange={onNameChange} />
        {/* onChange={onNameChange} required /> */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="createEventForm.ControlInput2">
        <Form.Label>Location </Form.Label>
        <Form.Control type="text" value={location} onChange={onLocationChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createEventForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" value={description} rows={3} onChange={onDescriptionChange}/>
      </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="createEventForm.ControlInput3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={date} onChange={onStartDateChange} required />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="createEventForm.ControlInput4">
            <Form.Label>Time</Form.Label>
            <Form.Control type='time' value={time} onChange={onTimeChange} required/>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" disabled={!canSubmit}
        onClick={handleUpdate}>
          Save
      </Button>
      <Button variant="primary" type="submit" /*disabled={!canSubmit}*/
        onClick={handleDelete}>
          Delete
      </Button>
    </Form>
  );
};

export default EditEvent;
