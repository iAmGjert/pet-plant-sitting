import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';
// import Calendar = require('react-calendar-mobile');
import Button from 'react-bootstrap/Button';


import { useSelector } from 'react-redux';
//import { bindActionCreators } from 'redux'; this is what we will import when we have our actions created

const CalendarApp = () =>{
  //eventually, when set up your section in the store, you can return the key value pair necessary to your feature 
  const state = useSelector((state) => state);
  console.log(state);
  const [value, onChange] = useState(new Date());
  
  return (
    <div>
      <Link to="/mobileView">
        <Button variant="primary">Mobile View</Button>{' '}
      </Link>
      <Calendar onChange={onChange} 
        value={value}
      />
      {value.toString()}
  
    </div> 

  );
};

CalendarApp.propTypes = {};

export default CalendarApp;

