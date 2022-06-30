import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../state/hooks';
import Client from './Client';

const ClientList = () => {
  const [availableJobs, setAvailableJobs] = useState([]);
  const currUser = useAppSelector((state) => state.userProfile.value);

  const getJobs = async () => {
    const jobs = await axios.get('/api/jobs/all');

    const availableJobs = jobs.data.filter((job: any) => {
      const aJobIAppliedFor = job.job_applicants.filter((job_applicant: any) => job_applicant['user_id'] === currUser.id);
      
      if (job.sitter_id === null && aJobIAppliedFor.length > 0) {
        return true;
      }
    });
    
    setAvailableJobs(availableJobs);
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <h3>Potential Clients</h3>
      {availableJobs.map((job) => <Client key={job.employer_id} job={job} />)}
    </div>
  );
}

export default ClientList;