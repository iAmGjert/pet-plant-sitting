import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../state/hooks';
import PendingClient from './PendingClient';
import { Container, Row } from 'react-bootstrap';

const PendingClientList = () => {
  const [availableJobs, setAvailableJobs] = useState([]);
  const currUser = useAppSelector((state) => state.userProfile.value);
  const jobs = useAppSelector((state) => state.job.jobs);

  const getJobs = async () => {
    // const jobs = await axios.get('/api/jobs/all');

    const availableJobs = jobs.filter((job: any) => {
      const aJobIAppliedFor = job.job_applicants.filter((job_applicant: any) => job_applicant['user_id'] === currUser.id);
      
      if (job.sitter_id === null && aJobIAppliedFor.length > 0 && job.isCompleted === false) {
        return true;
      }
    });
    
    setAvailableJobs(availableJobs);
  };

  useEffect(() => {
    getJobs();
  }, [currUser]);

  return (
    <Container>
      <h3>Pending Clients</h3>
      {availableJobs.map((job) => {
        return <PendingClient key={job.employer_id} job={job} />;
      })}
    </Container>
  );
}

export default PendingClientList;