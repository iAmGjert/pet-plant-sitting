import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack, Alert, Card } from 'react-bootstrap';
//import moment from 'moment';
import * as moment from 'moment';

//import { useSelector } from 'react-redux';
//create a function here that will convert index of day of the week to string

const CalendarMobile = () => {
  //STEP 1: CREATE FUNCTION THAT WILL ADD CORRECT DATES TO BOOTSTRAP CARDS

  //STEP 2: CONNECT THOSE DATES TO ANY HAPPENING OCCURRING ON SAID DAY

  //STEP 3: CREATE CALENDAR NOTE ROUTE SO THAT USER CAN CREATE A NOTE ON DATE, UPDATE IT, DELETE IT, ETC.

  const todaysDateWithDay = moment().format('LLLL'); //Tuesday, June 28, 2022 5:07 PM
  const currentDate = moment().format('YYYY-MM-DD'); //2022-06-28
  const time = moment().format('MMM Do'); //Jun 28th
  //console.log(moment.version);//2.29.3

  const dateStr = '';

  for (let i = 0; i < 7; i++) {
    console.log(moment().startOf('week').add(i, 'days').format('ddd, MMM Do'));
  }

  //let newDate = moment('DD-MM-YYYY').add(5, 'days');
  //let newDate = moment().format('MMM Do').add(5, 'days');
  // console.log(newDate);
  // console.log(moment().add(7, 'days')); //returns object

  return (
    // <div>
    //   {/* <Stack gap={3}>
    //     <h6 className='mt-3'>
    //       {moment().format('MMM Do')} to {moment().add(7, 'days').calendar()}
    //     </h6>
    //     {/* <Alert variant="success">You have nothing scheduled for this day</Alert> */}
    //     <div className='bg-light border'>
    //       {moment().format('dddd')} {moment().format('MMM Do YY')}
    //     </div>
    //     <div className='bg-light border'>
    //       {moment().add(1, 'days').calendar()}
    //     </div>
    //     <div className='bg-light border'>The next next day</div>
    //   </Stack> */}

    // </div>
    <Card>
      <Card.Body>This is some text</Card.Body>
    </Card>
  );
};

export default CalendarMobile;
