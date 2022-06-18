import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';
// import PropTypes from 'prop-types';
//calendar stuff
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { useSelector } from 'react-redux';
import { getEventListeners } from 'events';
//import { bindActionCreators } from 'redux'; this is what we will import when we have our actions created

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';


const CalendarApp = () => {

  const [dateState, setDateState] = useState(new Date());
 
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  //redux hooks
  const user = useAppSelector(state => state.userProfile.value);
  const dispatch = useAppDispatch();
  const state = useSelector((state) => state);

  const changeDate = (e) => {
    setDateState(e);
  };

  const getAllEvents = () => {
    return axios.get('/api/events/all').then((res) => {
      console.log(res, 'res on 40');
      dispatch(setEvents(res.data));
    })
      .then((err) => {
        console.error(err);
      });
  };

  const getAllJobs = () => {
    return axios.get('/api/jobs/all').then((res) => {
      console.log(res, 'res on 50');
    })
      .then((err) => {
        console.error(err);
      });
  };


  return (
    <div className='app'>
      {/* <Button variant="primary">Plants</Button>{' '}
      <Button variant="primary">Pets</Button>{' '} */}
      {/* <Button variant="primary">Mobile View</Button>{' '} */}
      <h1 className='text-center'>Upcoming Jobs and Events</h1>
      <div className='calendar-container'>
        <Calendar
          value={dateState}
          onChange={changeDate}
          onClick={console.log('hello')}
        />
        <p>Current selected date is <b>{moment(dateState).format('MMMM Do YYYY')}</b></p>
      </div>
    </div>
  );
};

CalendarApp.propTypes = {};

export default CalendarApp;

{ /* {date.length > 0 ? (
  <p className='text-center'>
    <span className='bold'>Start:</span>{' '}
    {date[0].toDateString()}
    &nbsp;|&nbsp;
    <span className='bold'>End:</span> {date[1].toDateString()}
  </p>
) : (
  <p className='text-center'>
    <span className='bold'>Default selected date:</span>{' '}
    {date.toDateString()}
  </p>
)} */ }




//eventually, when set up your section in the store, you can return the key value pair necessary to your feature 
//const [value, onChange] = useState(new Date());
//const [selectedDate, setSelectedDate] = useState(null);
//const [date, setDate] = useState(new Date());
