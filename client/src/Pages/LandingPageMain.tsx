import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Landing from '../Components/LandingPage/Landing';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';

//Redux
import { useAppSelector, useAppDispatch } from '../state/hooks';

//import axios from 'axios';

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

const LandingPageMain: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.userProfile.value);
  const users = useAppSelector((state) => state.userProfile.users);
  const petPlants = useAppSelector((state) => state.petPlant.petPlants);
  const jobs = useAppSelector((state) => state.job.jobs);
  const events = useAppSelector((state) => state.events.events);

  return (
    <Landing />
  );
};

export default LandingPageMain;
