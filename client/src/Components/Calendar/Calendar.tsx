import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar';

const CalendarApp = () =>{
  const [value, onChange] = useState(new Date());
  
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
  
    </div>
  );
};

CalendarApp.propTypes = {};

export default CalendarApp;

