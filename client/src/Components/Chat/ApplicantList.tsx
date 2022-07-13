import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import Applicants from './Applicants';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';

const ApplicantList = () => {
  const [jobsIPosted, setJobsIPosted] = useState([]);
  // const jobs = useAppSelector((state) => state.job.jobs);
  const currUser = useAppSelector((state) => state.userProfile.value);

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
            <Container>
              <Card className='chat-card'>
                <h6>{job.startDate}</h6>
                <h6>Description: {job.description}</h6>
                {job.job_applicants.length > 0 ? <Applicants job_applicants={job.job_applicants} /> : 
                  <p>No Applicants</p>
                }
              
              </Card>
            </Container>
          </div>
        );
      })}
    </Container>
  );

};

export default ApplicantList;
