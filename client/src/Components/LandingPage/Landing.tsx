import React, { FC, useState, useEffect, useContext } from 'react';
//import { useNavigate } from 'react-router-dom';
import UpcomingJobs from './UpcomingJobs';
import LandingEventCard from './LandingEventCard';
import AppliedJobsBoard from './AppliedJobsBoard';
//import * as moment from 'moment';
import JobHistory from './JobHistory';
import UpcomingEvent from './UpcomingEvent';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

//Redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';
// Import fetchUpcomingJobs action-creator in order to make that axios call
import {
  fetchUpcomingJobs,
  fetchApplications,
  fetchPastJobs,
} from '../../state/features/jobs/jobSlice';
import { fetchUpcomingEvents } from '../../state/features/events/eventsSlice';
import { Link } from 'react-router-dom';
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
  //const theme = useContext(ThemeContext);
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
  //console.log('events', events);
  const sitterUpcomingJobs = upcomingJobs.filter(
    (job: { sitter_id: number }) => {
      return job.sitter_id === user.id;
    }
  );

  //console.log(sitterUpcomingJobs, 11);
  const sitterWorkHistory = pastJobs.filter((job: { sitter_id: number }) => {
    return job.sitter_id === user.id;
  });

  //console.log('sitterWorkHistory', sitterWorkHistory);
  //console.log('applications', applications);
  //console.log('upcoming jobs', upcomingJobs);
  useEffect(() => {
    dispatch(fetchUpcomingJobs());
    dispatch(fetchUpcomingEvents());
    dispatch(fetchApplications());
    dispatch(fetchPastJobs());
  }, []);

  return (
    <div className='landingpage-contents'>
      <h1 className='landing-welcome-header'>
        Welcome {user.name ? ` ${user.name}!` : '!'}
      </h1>
      <img className='landing-svg' src={require('../../../Public/svg/fern-herm-pets-alt.svg')} alt='' />

      <Card className='landing-welcome-card'>
        {/* <Card.Header className='landing-welcome-header'>
          Welcome {user.name ? ` ${user.name}!` : '!'}
        </Card.Header> */}
        {/* <Card.Title>Fern Herm is happy to have you!</Card.Title> */}
        {/* <Card.Img variant='top' src={require('./Logo.svg')} /> */}
      </Card>
      <JobHistory sitterWorkHistory={sitterWorkHistory} />
      {sitterUpcomingJobs.length > 0 ? (
        sitterUpcomingJobs.map(
          (element: {
            id: React.Key;
            startDate: any;
            endDate: any;
            //3;
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
      ) : (
        <p className='no_upcoming_jobs'>
          You have no upcoming sittings. Click <Link to='/jobs'>here</Link> to
          find the perfect sitter or to connect yourself with a sitting gig!
        </p>
      )}

      <h1 className='next-upcoming-event-header'>Next Community Event:</h1>
      {upcomingEvents
        .slice(0, 1)
        .map(
          (element: {
            id: React.Key;
            startDate: any;
            startTime: any;
            description: any;
            location: any;
            name: any;
          }) => {
            return (
              <React.Fragment
                key={`UpcomingEvents key: ${
                  ~~(Math.random() * 1000) * (element.id + 1)
                }`}
              >
                <LandingEventCard
                  // key={element.id}
                  startDate={element.startDate}
                  startTime={element.startTime}
                  description={element.description}
                  location={element.location}
                  name={element.name}
                />
              </React.Fragment>
            );
          }
        )}

      <h1 className='applications-header'>Your Status on Upcoming Sittings:</h1>
      <section className='applications'>
        {applications.length > 0 ? (
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
                <AppliedJobsBoard
                  key={element.id}
                  startDate={element.job.startDate}
                  petPlants={element.job.job_pets_plants}
                  location={element.job.location}
                  {...element}
                />
              );
            }
          )
        ) : (
          <p className='no-applications'>
            You have 0 pending sittings. Click <Link to='/jobs'>here</Link> to
            apply!
          </p>
        )}
      </section>
    </div>
  );
};

export default Landing;
