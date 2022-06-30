import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../state/hooks';
import Applicants from './Applicants';
import axios from 'axios';

const ApplicantList = () => {
  const [jobsIPosted, setJobsIPosted] = useState([]);
  const currUser = useAppSelector((state) => state.userProfile.value);

  const getJobs = async () => {
    const jobs = await axios.get('/api/jobs/all');

    const jobsIPosted = jobs.data.filter((job: any) => {
      if (job.sitter_id === null && job.employer_id === currUser.id) {
        return true;
      }
    });
    console.log(jobsIPosted);
    console.log(currUser.id);
    setJobsIPosted(jobsIPosted);
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <h3>Applicants</h3>
      {jobsIPosted.map((job) => {
        return (
          <div key={job.id}>
            <h6>{job.startDate}</h6>
            <Applicants job_applicants={job.job_applicants} />
          </div>
        );
      })}
    </div>
  );

};

export default ApplicantList;
