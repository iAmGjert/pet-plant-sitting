import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import AcceptedApplicant from './AcceptedApplicant';
import axios from 'axios';
import { Container } from 'react-bootstrap';

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
    <Container>
      <h3>Accepted Applicants</h3>
      {filledJobs.map((job: any) => {
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
      })}
    </Container>
  );
};

export default AcceptedApplicantList;
