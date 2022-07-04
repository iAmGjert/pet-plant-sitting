import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../state/hooks';
import ConfirmedClient from './ConfirmedClient';
import { Container } from 'react-bootstrap';

const ConfirmedClientList = () => {
  const [confirmedJobs, setConfirmedJobs] = useState([]);
  const currUser = useAppSelector((state) => state.userProfile.value);

  const getJobs = async () => {
    const jobs = await axios.get('/api/jobs/all');

    const confirmedJobs = jobs.data.filter((job: any) => {
      if (job.sitter_id === currUser.id && job.isCompleted === false) {
        return true;
      }
    });
    
    setConfirmedJobs(confirmedJobs);
  };

  useEffect(() => {
    getJobs();
  }, [currUser]);

  return (
    <Container>
      <h3>Confirmed Clients</h3>
      {confirmedJobs.map((job) => <ConfirmedClient key={job.employer_id} job={job} />)}
    </Container>
  );
}

export default ConfirmedClientList;

