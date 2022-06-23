import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpcomingJobs from './UpcomingJobs';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';
// Import fetchUpcomingJobs action-creator in order to make that axios call
import { fetchUpcomingJobs } from '../../state/features/jobs/jobSlice';

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
  console.log('upcoming jobs', upcomingJobs);
  const events = useAppSelector((state) => state.events.events);

  // const [upcomingWork, setUpcomingWork] = useState([]);

  // const getUpcomingJobs = () => {
  //   axios
  //     .get('/api/jobs/all')
  //     .then((response) => {
  //       console.log(64, response.data);
  //       return response.data;
  //     })
  //     .then((res) => {
  //       //in this then block, I am filtering out work that is upcoming/incomplete
  //       //console.log('res on 78', res);
  //       const upcomingLabor = res.filter((job: { isCompleted: boolean }) => {
  //         //console.log('job on 75', job);
  //         return job.isCompleted === false;
  //       });
  //       console.log(62, upcomingLabor);
  //       setUpcomingWork(upcomingLabor);
  //       return upcomingLabor;
  //     })
  //     .then((newArr) => {
  //       console.log(67, newArr);
  //       // return newArr.map((trabajos) => {
  //       //   return trabajos.pet_plant
  //       // })
  //       return newArr.map((job) => {
  //         return;
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  useEffect(() => {
    dispatch(fetchUpcomingJobs());
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
      <Button variant='primary'>More Info</Button>
      {upcomingJobs.length &&
        upcomingJobs.map((element) => {
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
    </div>
  );
};

export default Landing;
