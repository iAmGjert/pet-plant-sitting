import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UpcomingJobs from './UpcomingJobs';
import LandingEventCard from './LandingEventCard';
import AppliedJobsBoard from './AppliedJobsBoard';
import * as moment from 'moment';
import JobHistory from './JobHistory';
import UpcomingEvent from './UpcomingEvent';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';
// Import fetchUpcomingJobs action-creator in order to make that axios call
import {
  jobs,
  fetchUpcomingJobs,
  fetchApplications,
  fetchPastJobs,
} from '../../state/features/jobs/jobSlice';
import { fetchUpcomingEvents } from '../../state/features/events/eventsSlice';

//typescript;
interface jobs {
  id: number;
  location: string;
  employer_id: number;
  sitter_id: number | null;
  startDate: Date;
  endDate: Date;
  pet_plant: Array<number>;
  isCompleted: boolean;
}

interface events {
  id: number;
  location: string;
  startDate: Date;
  endDate: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Landing: FC<Props> = () => {
  //const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userProfile.value);
  // const users = useAppSelector((state) => state.userProfile.users);
  const petPlants = useAppSelector((state) => state.petPlant.petPlants);
  const upcomingJobs = useAppSelector((state) => state.job.upcomingJobs);
  const upcomingEvents = useAppSelector((state) => state.events.upcomingEvents);
  const jobs = useAppSelector((state) => state.job.jobs);
  const applications = useAppSelector((state) => state.job.applications);
  const pastJobs = useAppSelector((state) => state.job.pastJobs);

  const events = useAppSelector((state) => state.events.events);
  console.log(petPlants, 'petPlants');

  const orderedEvents =
    events instanceof Array &&
    events
      .slice() //creating copy of original events array
      .sort((a, b) => a.startDate.localeCompare(b.startDate)) //sorting by hour as well as time. Returns 1 if sorted after, -1 if sorted before, 0 if equal
      .filter(
        (event) =>
          new Date() <= new Date(`${event.startDate} ${event.startTime}`)
      );

  console.log('orderedEvents', orderedEvents);

  const sitterUpcomingJobs = upcomingJobs.filter(
    (job: { sitter_id: number }) => {
      return job.sitter_id === user.id;
    }
  );
  console.log('sitterUpcomingJobs', sitterUpcomingJobs);

  const trimmedUpcomingEvents = upcomingEvents.slice(4);
  const sitterWorkHistory = pastJobs.filter((job: { sitter_id: number }) => {
    return job.sitter_id === user.id;
  });

  console.log('sitterWorkHistory', sitterWorkHistory);

  useEffect(() => {
    dispatch(fetchUpcomingJobs());
    dispatch(fetchUpcomingEvents());
    dispatch(fetchApplications());
    dispatch(fetchPastJobs());
  }, []);

  return (
    <div>
      <Card className='bootstrap-card'>
        <Card.Header as='h5'>
          Welcome {user.name ? `, ${user.name}!` : '!'}
        </Card.Header>
        <Card.Title>Fern Herm is happy to have you!</Card.Title>
        <Card.Img
          variant='top'
          src='https://i.pinimg.com/originals/f3/76/ba/f376ba480a39d91f373541063de5c8e8.png'
        />
      </Card>

      {sitterUpcomingJobs.length > 0
        ? sitterUpcomingJobs.map(
            (element: {
              id: React.Key;
              startDate: any;
              endDate: any;
              employer_id: any;
              location: any;
              job_pets_plants: any;
            }) => {
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
            }
          )
        : null}

      {trimmedUpcomingEvents.map(
        (element: {
          id: React.Key;
          startDate: any;
          description: any;
          location: any;
          name: any;
        }) => {
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
        }
      )}

      {applications.length &&
        applications.map(
          (
            element: JSX.IntrinsicAttributes & {
              status: any;
              job: any;
              id: any;
              startDate: any;
              endDate: any;
            }
          ) => {
            return (
              <>
                <AppliedJobsBoard
                  key={element.id}
                  startDate={element.startDate}
                  {...element}
                />
              </>
            );
          }
        )}

      <JobHistory sitterWorkHistory={sitterWorkHistory} />
    </div>
  );
};

export default Landing;
