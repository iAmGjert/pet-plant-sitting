import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
//import CalendarMobile from './CalendarMobile';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

import { useSelector } from 'react-redux';
import { getEventListeners } from 'events';
//import { bindActionCreators } from 'redux'; this is what we will import when we have our actions created

const CalendarApp = () =>{
  //eventually, when set up your section in the store, you can return the key value pair necessary to your feature 
  const [value, onChange] = useState(new Date());
  //const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [job, setJobs] = useState([]);
  
  //redux hooks
  const user = useAppSelector(state => state.userProfile.value);
  const dispatch = useAppDispatch();
  const state = useSelector((state) => state);

  
  //use useEffect to connect job listings and community events from backend to calendar   
  useEffect(() => {
    const getAllEvents = async() => {
      const res = await axios.get('/api/jobs/all');
      console.log(res, 'res on 40');
      return dispatch(setJobs(res.data));
    };
    getAllEvents();
  }, []);


  return (
    <div className='app'>
      <Button variant="primary">Plants</Button>{' '}
      <Button variant="primary">Pets</Button>{' '}
      <Button variant="primary">Mobile View</Button>{' '}
      <h1 className='text-center'>Upcoming Jobs and Events</h1>
      <div className='calendar-container'>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
        />
      </div>
      {date.length > 0 ? (
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
      )}
    </div>


  );
};

CalendarApp.propTypes = {};

export default CalendarApp;
