import React from 'react';
import { useState } from 'react';
import axios from 'axios';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';


const EventCard () => {

  const [event, setEvent] = useState({});

  const getSingleeEvent = (id) => {
    return axios.get(`/api/events/${id}`).then((res) => {
      console.log(res);
     // setEvent(res.id)
    })
    .catch((err) => {
      console.error(err);
    });
  }

  

  return (
    <Card className="mb-3" style={{ color: '#000'}}>
        <Card.Header>Community Event for the Day</Card.Header>
        <Card.Body>
          <Card.Title>
            Title of Event
            <Card.Text>
            </Card.Text>
            <Card.Subtitle className="mb-2 text-bold">Event Description</Card.Subtitle>
            <Card.Subtitle className="mb-4 text-muted">Event Location</Card.Subtitle>
          <Card.Subtitle className="mb-5 text-muted">Notes: </Card.Subtitle>
          </Card.Title>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Add Note</InputGroup.Text>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <Button variant="primary">Exit</Button>
        </Card.Body>
      </Card>
  );
}

export default EventCard;