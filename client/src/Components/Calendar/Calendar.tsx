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
//import { getEventListeners } from 'events';
//import { bindActionCreators } from 'redux'; this is what we will import when we have our actions created

//bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import FormControl from 'react-bootstrap/FormControl';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { ifError } from 'assert';

// interface jobStuff {
//   id: number,
//   location: string,
//   employer_id: number,
//   startDate: Date,
//   endDate: Date,
//   pet_plant: Array<number>
// }
console.log('hello');
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
        //console.log(res, 'res on 49');
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
        //console.log('filteredDate', filteredDate);
        setDatos(filteredDate);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const getAllEvents = () => {
  //   async () => {
  //     const response = await axios.get('/api/events/all');
  //     console.log('getAllEvents Response', response);
  //   };
  // };

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
        //console.log('response for jobs', jobs);
        const newDate = format(dateState, 'yyyy-MM-dd');
        //console.log('newDate', newDate);
        const filteredDate = response.filter((job) => {
          //console.log('event startDate here', event.startDate);
          return job.startDate === newDate;
        });
        //console.log('filteredDate', filteredDate);
        setTrabajos(filteredDate);
        return filteredDate;
      })
      .then((resp) => {
        //console.log('resp on 102', resp);
        //console.log(102, trabajos);
        return axios.get('/api/pets_plants/all');
      })
      .then((res) => {
        //console.log('hello hello', res);
        return res.data;
      })
      .then((response) => {
        const pets = [];
        for (let trabajo of trabajos) {
          trabajo.pet_plant.forEach((petId) => {
            pets.push(response[petId - 1]);
          });
        }
        //console.log(pets);
        setPetPlants(pets);
        return pets;
      })
      .then((res) => {
        //console.log('150', res);
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
                  startTime={element.startTime}
                />
              </>
            );
          })}
        {trabajos.length > 0 &&
          trabajos.map((element) => {
            return (
              <>
                <JobCard
                  key={element.id}
                  startDate={element.startDate}
                  location={element.location}
                />
              </>
            );
          })}
        {petPlants &&
          petPlants?.length > 0 &&
          petPlants.map((element) => {
            return (
              <>
                <JobCard
                  key={element.id}
                  image={element.image}
                  bio={element.bio}
                  name={element.name}
                  breed={element.breed}
                />
              </>
            );
          })}
        <p>
          Current selected date is{' '}
          <b>{moment(dateState).format('MMMM Do YYYY')}</b>
        </p>
      </div>
    </div>
  );
};

CalendarApp.propTypes = {};

export default CalendarApp;

//eventually, when set up your section in the store, you can return the key value pair necessary to your feature
//const [value, onChange] = useState(new Date());
//const [selectedDate, setSelectedDate] = useState(null);
//const [date, setDate] = useState(new Date());
