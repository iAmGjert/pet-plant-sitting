import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Alert } from 'react-bootstrap';
import moment from 'moment';


//import { useSelector } from 'react-redux';
//create a function here that will convert index of day of the week to string


const CalendarMobile = () => {
  
  //const state = useSelector((state) => state);
  // let now = new Date();
  // let nextWeek = new Date(new Date(now).setDate(now.getDate() + 7));
  return (
    <div>
      
      <Stack gap={3}>
        <h6 className="mt-3">{moment().format('MMM Do YY')} to {moment().add(7, 'days').calendar()}</h6>
        {/* <Alert variant="success">You have nothing scheduled for this day</Alert> */}
        <div className="bg-light border">{moment().format('dddd')} {moment().format('MMM Do YY')}</div>
        <div className="bg-light border">{moment().add(1, 'days').calendar()}</div>
        <div className="bg-light border">The next next day</div>
      </Stack>
    </div>
      
 
  );

};


export default CalendarMobile;
