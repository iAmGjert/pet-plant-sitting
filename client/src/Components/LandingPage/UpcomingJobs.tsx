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

const upcomingJobs: FC<Props> = () => {
  const jobs = useAppSelector((state) => state.job.jobs);

  return <div>hello</div>;
};

export default upcomingJobs;
