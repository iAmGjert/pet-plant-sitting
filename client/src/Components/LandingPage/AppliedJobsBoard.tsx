import React from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteApplication } from '../../state/features/jobs/jobSlice';

const AppliedJobsBoard = ({ status, job, id }) => {
  const dispatch = useAppDispatch();

  const cancelApplication = (id) => {
    dispatch(deleteApplication(id));
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{status}</Card.Title>
        <Card.Text>{job.description}</Card.Text>
        <Button variant='primary' onClick={() => cancelApplication(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AppliedJobsBoard;
