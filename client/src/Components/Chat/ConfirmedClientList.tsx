import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../state/hooks';
import ConfirmedClient from './ConfirmedClient';
import { Container, Card } from 'react-bootstrap';

const ConfirmedClientList = () => {
  const [confirmedJobs, setConfirmedJobs] = useState([]);
  const currUser = useAppSelector((state) => state.userProfile.value);
  const usersOnline = useAppSelector((state) => state.chat.usersOnline);
  // const jobs = useAppSelector((state) => state.job.jobs);

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

  }, [usersOnline]);

  return (
    <Container>
      <div>
        <h3 className='confirmed-employers-header'>Confirmed Employers:</h3>
      </div>
      {confirmedJobs.length === 0 ? (
        <Card>
          <Card.Body>
            There are currently no confirmed employers.
          </Card.Body>
        </Card>
      ) : confirmedJobs.map((job) => (
        <ConfirmedClient key={job.employer_id} job={job} />
      ))}
    </Container>
  );
};

export default ConfirmedClientList;
