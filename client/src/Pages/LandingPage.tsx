import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Redux
import { useAppSelector, useAppDispatch } from '../state/hooks';

import axios from 'axios';

//typescript
interface jobStuff {
  id: number;
  location: string;
  employer_id: number;
  sitter_id: number | null;
  startDate: Date;
  endDate: Date;
  pet_plant: Array<number>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const LandingPage: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.userProfile.value);
  const users = useAppSelector((state) => state.userProfile.users);
  const petPlants = useAppSelector((state) => state.petPlant.petPlants);
  const jobs = useAppSelector((state) => state.job.jobs);
  const events = useAppSelector((state) => state.events.events);

  return (
    <div>
      <h1>Welcome {user.name ? `, ${user.name}!` : '!'}</h1>
      <p> Fern Herm is happy to have you!</p>

      <Card>
        <Card.Header as='h5'>Job 1</Card.Header>
        <Card.Body>
          <Card.Title>Sitting for pet_plant name!</Card.Title>
          <Card.Text>Date of Sitting.</Card.Text>
          <Button variant='primary'>More Info</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LandingPage;
