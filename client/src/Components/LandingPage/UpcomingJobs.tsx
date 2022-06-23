import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//Redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//typescript
interface upcomingJobs {
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

const upcomingJobs: FC<Props> = ({
  startDate,
  endDate,
  employer_id,
  location,
  petPlant,
}) => {
  const jobs = useAppSelector((state) => state.job.jobs);

  console.log(
    35,
    petPlant.map((pet) => {
      return pet.pet_plant.name;
    })
  );

  //First I need to sort whether the current job matches today's date. If so, then ensure that it gets added to the Your Next Job card

  //Then I need to grab the petPlant array and filter out the name and image of the petPlant

  return (
    <Card>
      <Card.Body>
        <Card.Title>Your Next Job: {petPlant[0].name} </Card.Title>
        <Card.Text>{startDate}</Card.Text>
        <Card.Text>{location}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default upcomingJobs;
