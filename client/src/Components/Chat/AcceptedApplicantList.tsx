import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import AcceptedApplicant from './AcceptedApplicant';
import axios from 'axios';
import { Card, Container } from 'react-bootstrap';

interface jobApplicant {
  user_id: number;
  job_id: number;
  status: string;
}

const AcceptedApplicantList = () => {
  const [filledJobs, setFilledJobs] = useState([]);
  // const jobs = useAppSelector((state) => state.job.jobs);
  const currUser = useAppSelector((state) => state.userProfile.value);
  // const jobs = useAppSelector((state) => state.job.jobs);

  const getJobs = async () => {
    const jobs = await axios.get('/api/jobs/all');

    const filledJobs = jobs.data.filter((job: any) => {
      if (
        job.sitter_id !== null &&
        job.employer_id === currUser.id &&
        job.isCompleted === false
      ) {
        return true;
      }
    });

    // console.log(filledJobs);
    // console.log(currUser.id);

    setFilledJobs(filledJobs);
  };

  useEffect(() => {
    getJobs();
  }, [currUser]);

  return (
    <Container className="chat-sitters-list">
      <div className="chat-sitters-header">
        <h3>Sitters:</h3>
      </div>
      {filledJobs.length > 0 ? (
        filledJobs.map((job: any) => {
          return (
            <div className='chat-user' key={job.id}>
              <AcceptedApplicant
                accepted_applicant={job.job_applicants.filter(
                  (job_applicant: jobApplicant) =>
                    job_applicant.status === 'accepted'
                )}
                job={job}
              />
            </div>
          );
        })) :
        <Card>
          <Card.Body>
            You have not hired any sitters.
          </Card.Body>
        </Card>
      }
    </Container>
  );
};

export default AcceptedApplicantList;
