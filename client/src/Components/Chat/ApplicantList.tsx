import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import Applicants from './Applicants';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const ApplicantList = () => {
  const [jobsIPosted, setJobsIPosted] = useState([]);
  // const jobs = useAppSelector((state) => state.job.jobs);
  const currUser = useAppSelector((state) => state.userProfile.value);
  // const jobs = useAppSelector((state) => state.job.jobs);

  const getJobs = async () => {

    const jobs = await axios.get('/api/jobs/all');

    const jobsIPosted = jobs.data.filter((job: any) => {
      if (job.sitter_id === null && job.employer_id === currUser.id && job.isCompleted === false) {
        return true;
      }
    });

    setJobsIPosted(jobsIPosted);
  };

  useEffect(() => {
    getJobs();
  }, [currUser]);

  return (
    <Container>
      <h3>Applicants</h3>
      {jobsIPosted.map((job) => {
        return (
          <div key={job.id}>
            <h6>{job.startDate}</h6>
            <Applicants job_applicants={job.job_applicants} />
          </div>
        );
      })}
    </Container>
  );

};

export default ApplicantList;
