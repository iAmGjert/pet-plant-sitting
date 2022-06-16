import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//let Calendar = require('react-calendar-mobile');

import { useSelector } from 'react-redux';




const CalendarMobile = () => {
  
  const state = useSelector((state) => state);
  
  return (
    <div>
      hello
    </div>
  );

};


export default CalendarMobile;