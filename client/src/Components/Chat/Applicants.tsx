import React from 'react';
import Applicant from './Applicant';

const Applicants = ({ job_applicants }: { job_applicants: any }) => {
  return (
    <div>
      {job_applicants.map((applicant: any) => 
        <Applicant key={applicant.id} applicant={applicant}/>
      )}
    </div>
  );
};

export default Applicants;
