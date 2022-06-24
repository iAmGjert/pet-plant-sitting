import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpcomingJobs from './UpcomingJobs';
import LandingEventCard from './LandingEventCard';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';
// Import fetchUpcomingJobs action-creator in order to make that axios call
import { fetchUpcomingJobs } from '../../state/features/jobs/jobSlice';
import { fetchUpcomingEvents } from '../../state/features/events/eventsSlice';
//typescript
interface upcomingJobs {
  id: number;
  location: string;
  employer_id: number;
  sitter_id: number | null;
  startDate: Date;
  endDate: Date;
  pet_plant: Array<number>;
  isCompleted: boolean;
}

interface communityEvents {
  id: number;
  location: string;
  startDate: Date;
  endDate: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Landing: FC<Props> = () => {
  //const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userProfile.value);
  const users = useAppSelector((state) => state.userProfile.users);
  const petPlants = useAppSelector((state) => state.petPlant.petPlants);
  const upcomingJobs = useAppSelector((state) => state.job.upcomingJobs);
  const upcomingEvents = useAppSelector((state) => state.events.upcomingEvents);

  // console.log('upcomingEvents', upcomingEvents);
  // console.log('upcoming jobs', upcomingJobs);
  const events = useAppSelector((state) => state.events.events);

  const trimmedUpcommingJobs = upcomingJobs.slice(1);
  const trimmedUpcomingEvents = upcomingEvents.slice(4);

  useEffect(() => {
    dispatch(fetchUpcomingJobs());
    dispatch(fetchUpcomingEvents());
  }, []);

  return (
    <div>
      <Card>
        <Card.Header as='h5'>
          Welcome {user.name ? `, ${user.name}!` : '!'}
        </Card.Header>
        <Card.Title>Fern Herm is happy to have you!</Card.Title>
        <Card.Img
          variant='top'
          src='https://i.pinimg.com/originals/f3/76/ba/f376ba480a39d91f373541063de5c8e8.png'
        />
      </Card>
      {trimmedUpcommingJobs.length &&
        trimmedUpcommingJobs.map((element) => {
          return (
            <>
              <UpcomingJobs
                key={element.id}
                startDate={element.startDate}
                endDate={element.endDate}
                employer_id={element.employer_id}
                location={element.location}
                petPlant={element.job_pets_plants}
              />
            </>
          );
        })}

      {trimmedUpcomingEvents.length &&
        trimmedUpcomingEvents.map((element) => {
          return (
            <>
              <LandingEventCard
                key={element.id}
                startDate={element.startDate}
                description={element.description}
                location={element.location}
                name={element.name}
              />
            </>
          );
        })}
    </div>
  );
};

export default Landing;
