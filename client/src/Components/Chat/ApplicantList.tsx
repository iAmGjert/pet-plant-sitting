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

      {jobsIPosted.length > 0 ? jobsIPosted.map((job) => {
        return (
          <div key={job.id}>
            <Container>
              {job.job_applicants.length > 0 ? (
                <Card className='chat-card bootstrap-card'>
                  <div>
                    <h6 className='applicants-sitting-startdate'>
                      Sitting Start Date:
                    </h6>
                    <h6>
                      {moment(job.startDate).format('dddd, MMMM Do YYYY')}
                    </h6>
                    <h6 className='confirmed-client-name'>Sitting Description:</h6>
                    <h6>{job.description}</h6>
                    <Applicants job_applicants={job.job_applicants} />
                  </div>
                </Card>                
              ) : (
                <Card>
                  <Card.Body>
                    You currently do not have any applicants.
                  </Card.Body>
                </Card>
              )}
            </Container>
          </div>
        );
      }) : 
        <Card>
          <Card.Body>
          You have not posted any open jobs.
          </Card.Body>
        </Card>}
    </Container>
  );
};

export default ApplicantList;
