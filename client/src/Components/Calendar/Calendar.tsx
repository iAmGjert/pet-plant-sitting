import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Calendar = require('react-calendar-mobile');

import { useSelector } from 'react-redux';
//import { bindActionCreators } from 'redux'; this is what we will import when we have our actions created

const CalendarApp = () =>{
  //eventually, when set up your section in the store, you can return the key value pair necessary to your feature 
  const state = useSelector((state) => state);
  console.log(state);
  const [value, onChange] = useState(new Date());
  
  return (
    <div>
      {/* <Calendar onChange={onChange} 
        value={value}
      />
      {value.toString()}
  
    </div> */}
    <Datepicker
    controls={['calendar']}
    inputComponent="input"
    inputProps={{
        placeholder: 'Please Select...'
    }}
/>
  );
};

CalendarApp.propTypes = {};

export default CalendarApp;

