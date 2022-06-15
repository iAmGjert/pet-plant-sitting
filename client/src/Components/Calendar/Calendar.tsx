import React, { useState }from 'react';
import CalendarMain from '../../Pages/CalendarMain';
// import PropTypes from 'prop-types';
import Calendario from 'react-calendar';

const Calendar = () =>{
  const [date, setDate] = useState(new Date());
  
  const onChange = (date: React.SetStateAction<Date>) => {
    setDate(date);
  };
  return (
    <div>
      <CalendarMain onChange={onChange} date={date}/>
    </div>
  );
};

Calendar.propTypes = {};

export default Calendar;

