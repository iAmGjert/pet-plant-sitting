import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import { compareAsc, format } from 'date-fns';
import EventCard from './EventCard';
import JobCard from './JobCard';
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

// interface jobStuff {
//   id: number,
//   location: string,
//   employer_id: number,
//   startDate: Date,
//   endDate: Date,
//   pet_plant: Array<number>
// }

const CalendarApp = () => {
  const [dateState, setDateState] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [datos, setDatos] = useState([]);
  const [trabajos, setTrabajos] = useState([]);
  const [petPlants, setPetPlants] = useState([]);

  //redux hooks
  const user = useAppSelector((state) => state.userProfile.value);
  const dispatch = useAppDispatch();
  const state = useSelector((state) => state);

  const changeDate = (e) => {
    setDateState(e);
  };

  const getAllEvents = () => {
    return axios
      .get('/api/events/all')
      .then((res) => {
        //console.log(dateState);
        console.log(res, 'res on 49');
        // dispatch(setEvents(res.data));
        setEvents(res.data); //array of objects
        return res.data;
      })
      .then((response) => {
        //console.log('response', response);
        const newDate = format(dateState, 'yyyy-MM-dd');
        //console.log('newDate', newDate);
        const filteredDate = response.filter((event) => {
          //console.log('event startDate here', event.startDate);
          return event.startDate === newDate;
        });
        console.log('filteredDate', filteredDate);
        setDatos(filteredDate);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAllJobs = () => {
    return axios
      .get('/api/jobs/all')
      .then((res) => {
        //console.log(dateState);
        //console.log(res, 'res on 49');
        // dispatch(setEvents(res.data));
        setJobs(res.data); //array of objects
        return res.data;
      })
      .then((response) => {
        console.log('response for jobs', response);
        const newDate = format(dateState, 'yyyy-MM-dd');
        //console.log('newDate', newDate);
        const filteredDate = response.filter((job) => {
          //console.log('event startDate here', event.startDate);
          return job.startDate === newDate;
        });
        console.log('filteredDate', filteredDate);
        setTrabajos(filteredDate);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPetPlants = () => {
    axios
      .get('/api/pets_plants/all')
      .then((res) => {
        //console.log('p;ant res', res.data);
        setPetPlants(res.data);
        return res.data;
      })
      .then((response) => {
        console.log('113', response);
        const petPlant = response.filter((element) => {
          console.log('e', element);
          trabajos.filter((trabajo) => {
            console.log('trabajo pet ids', trabajo.pet_plant);
            trabajo.pet_plant.map((x) => {
              x === trabajo.id;
              console.log('hello', x);
            });
            return true;
          });
          return false;
        });

        console.log('petPlant', petPlant);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //format(new Date(2014, 1, 11), 'yyyy-MM-dd')
  //=> '2014-02-11'
  useEffect(() => {
    getAllEvents();
    getAllJobs();
    //console.log('filteredDate here', filteredDate);
  }, [dateState]);

  // use useEffect to connect job listings and community events from backend to calendar
  // useEffect(() => {
  //   const getAllEvents = async() => {
  //     const res = await axios.get('/api/jobs/all');
  //     console.log(res, 'res on 53');
  //     return dispatch(setJobs(res.data));
  //   };
  //   getAllEvents();
  // }, []);

  return (
    <div className='app'>
      {/* <Button variant="primary">Plants</Button>{' '}
      <Button variant="primary">Pets</Button>{' '} */}
      {/* <Button variant="primary">Mobile View</Button>{' '} */}
      <h1 className='text-center'>Upcoming Jobs and Events</h1>
      <div className='calendar-container'>
        <Calendar value={dateState} onChange={changeDate} />
        {datos.length > 0 &&
          datos.map((element) => {
            return (
              <>
                <EventCard
                  key={element.id}
                  name={element.name}
                  location={element.location}
                  description={element.description}
                />
              </>
            );
          })}

        {trabajos.length > 0 &&
          trabajos.map((element) => {
            return (
              <>
                <EventCard
                  key={element.id}
                  startDate={element.startDate}
                  location={element.location}
                />
              </>
            );
          })}
        <p>
          Current selected date is{' '}
          <b>{moment(dateState).format('MMMM Do YYYY')}</b>
        </p>
        <Button onClick={getPetPlants}>1</Button>
      </div>
    </div>
  );
};

CalendarApp.propTypes = {};

export default CalendarApp;

{
  /* {date.length > 0 ? (
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
)} */
}

//eventually, when set up your section in the store, you can return the key value pair necessary to your feature
//const [value, onChange] = useState(new Date());
//const [selectedDate, setSelectedDate] = useState(null);
//const [date, setDate] = useState(new Date());
