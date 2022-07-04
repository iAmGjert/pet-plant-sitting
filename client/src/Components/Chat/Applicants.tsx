import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Applicant from './Applicant';

const Applicants = ({ job_applicants }: { job_applicants: any }) => {

  return (
    <Container>
      {job_applicants.map((applicant: any) => 
        <Applicant key={applicant.id} applicant={applicant}/>
      )}
    </Container>
  );
};

export default Applicants;
