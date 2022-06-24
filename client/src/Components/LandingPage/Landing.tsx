import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpcomingJobs from './UpcomingJobs';
import LandingEventCard from './LandingEventCard';
import AppliedJobsBoard from './AppliedJobsBoard';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';
// Import fetchUpcomingJobs action-creator in order to make that axios call
//import { jobs } from '../../state/features/jobs/jobSlice';
import { jobs, fetchUpcomingJobs } from '../../state/features/jobs/jobSlice';
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
  //see if applicant id matches with sitter id

  //console.log(50, jobs);
  // console.log('upcomingEvents', upcomingEvents);
  // console.log('upcoming jobs', upcomingJobs);
  const events = useAppSelector((state) => state.events.events);

  const trimmedUpcommingJobs = upcomingJobs.slice(1);
  const trimmedUpcomingEvents = upcomingEvents.slice(4);

  console.log('array of jobs', jobs);
  //go to jobs. See if sitter exists in the sitter key and if that sitter is you.
  //display the interactions(whatever that is) for the jobs I have applied for.

  console.log('user', user); //sets to userObj assigned to me;

  const sitterMatchedJobs = jobs.filter((job) => {
    //console.log('each job', job);
    return job.sitter_id === user.id;
  });
  //console.log(70, sitterMatchedJobs);

  //id is job application id/ user_id is obviously is the user's id
  const sitterAppliedJobs = jobs.filter((job) => {
    return job.job_applicants.filter((sitter) => {
      return sitter.user_id === user.id;
    });
  });
  //console.log('sitterAppliedJobs', sitterAppliedJobs);

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
      <Button>Past Jobs</Button>
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

      {AppliedJobsBoard.length &&
        sitterAppliedJobs.map((element) => {
          return (
            <>
              <AppliedJobsBoard
                key={element.id}
                location={element.location}
                petPlant={element.pet_plant}
                startDate={element.startDate}
                endDate={element.endDate}
                employerId={element.employer_id}
              />
            </>
          );
        })}
    </div>
  );
};

export default Landing;
