import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import Applicants from './Applicants';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';
import moment from 'moment';

const ApplicantList = () => {
  const [jobsIPosted, setJobsIPosted] = useState([]);
  // const jobs = useAppSelector((state) => state.job.jobs);
  const currUser = useAppSelector((state) => state.userProfile.value);

  const getJobs = async () => {
    const jobs = await axios.get('/api/jobs/all');

    const jobsIPosted = jobs.data.filter((job: any) => {
      if (
        job.sitter_id === null &&
        job.employer_id === currUser.id &&
        job.isCompleted === false
      ) {
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
      <div className='chat-applicants-header'>
        <h3>Applicants:</h3>
      </div>

      {jobsIPosted.map((job) => {
        return (
          <div key={job.id}>
            <Container>
              <Card className='chat-card bootstrap-card'>
                {job.job_applicants.length > 0 ? (
                  <div>
                    <Applicants job_applicants={job.job_applicants} />
                    <h6 className='applicants-sitting-startdate'>
                      Sitting Start Date:
                    </h6>
                    <h6>
                      {moment(job.startDate).format('dddd, MMMM Do YYYY')}
                    </h6>
                    <h6 className='applicants-description'>Description:</h6>
                    <h6>{job.description}</h6>
                  </div>
                ) : (
                  <p>There are currently no applicants</p>
                )}
              </Card>
            </Container>
          </div>
        );
      })}
    </Container>
  );
};

export default ApplicantList;
