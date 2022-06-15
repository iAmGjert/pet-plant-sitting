import React, { useState } from 'react';
import CalendarMain from '../../Pages/CalendarMain';

// import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Calendar = () =>{
  const [date, setDate] = useState(new Date());
  
  const onChange = (date: React.SetStateAction<Date>) => {
    setDate(date);
  };
  return (
    <div>
      {/* <CalendarMain onChange={onChange} date={date}/> */}
      <h1>Calendar</h1>
    </div>
  );
};

Calendar.propTypes = {};

export default Calendar;

