import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpcomingJobs from './UpcomingJobs';
import LandingEventCard from './LandingEventCard';
import AppliedJobsBoard from './AppliedJobsBoard';
import * as moment from 'moment';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';
// Import fetchUpcomingJobs action-creator in order to make that axios call
import {
  jobs,
  fetchUpcomingJobs,
  fetchApplications,
  //fetchPastJobs,
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userProfile.value);
  const users = useAppSelector((state) => state.userProfile.users);
  const petPlants = useAppSelector((state) => state.petPlant.petPlants);
  const upcomingJobs = useAppSelector((state) => state.job.upcomingJobs);
  const upcomingEvents = useAppSelector((state) => state.events.upcomingEvents);
  const jobs = useAppSelector((state) => state.job.jobs);
  const applications = useAppSelector((state) => state.job.applications);
  //const pastJobs = useAppSelector((state) => state.job.pastJobs);
  console.log('applications', applications);
  //see if applicant id matches with sitter id

  const events = useAppSelector((state) => state.events.events);

  const trimmedUpcommingJobs = upcomingJobs.slice(1);
  const trimmedUpcomingEvents = upcomingEvents.slice(4);

  // const currentDate = moment().format('YYYY-MM-DD');
  // console.log('currentDate', currentDate);
  // console.log(moment(currentDate).isBefore('2022-07-22'));

  // const pastLabor = jobs.filter((job) => {
  //   console.log('startDate', job.startDate);
  //   return moment(job.startDate).isBefore(currentDate);
  // });
  // console.log('pastLabor', pastLabor);

  //id is job application id/ user_id is obviously is the user's id

  // const sitterUpcomingJobs = jobs.filter((job) => {
  //   console.log('x', job.sitter_id);
  //   return job.sitter_id === user.id;
  // });
  // console.log('sitterUpcomingJobs', sitterUpcomingJobs);

  // const sitterAppliedJobs = jobs.filter((job) => {
  //   //looping over jobs array first
  //   return job.job_applicants.filter((sitter) => {
  //     //looping over job_applicants array
  //     return sitter.user_id === user.id; //returning only jobs that I as user have applied for
  //   });
  // });

  //console.log('sitterAppliedJobs', sitterAppliedJobs);
  console.log('SQUIREEEEEEEEELLLL');
  console.log(user);
  useEffect(() => {
    dispatch(fetchUpcomingJobs());
    dispatch(fetchUpcomingEvents());
    dispatch(fetchApplications());
    //dispatch(fetchPastJobs());
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

      {/* {sitterMatchedJobs.length &&
        sitterMatchedJobs.map((element) => {
          return (
            <>
              <SitterJobBoard
                key={element.id}
                petPlants={element.job_pet_plants}
                location={element.location}
                startDate={element.startDate}
                endDate={element.endDate}
                employer_id={elment.employer_id}
              />
            </>
          );
        })} */}

      {applications.length &&
        applications.map((element) => {
          return (
            <>
              <AppliedJobsBoard key={element.id} {...element} />
            </>
          );
        })}
    </div>
  );
};

export default Landing;
