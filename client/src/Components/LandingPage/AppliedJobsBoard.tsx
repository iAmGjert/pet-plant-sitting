import React from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import moment from 'moment';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteApplication } from '../../state/features/jobs/jobSlice';

const AppliedJobsBoard = ({ status, job, id, startDate, endDate }) => {
  const dispatch = useAppDispatch();
  console.log('job in board', job);
  console.log('startDate', startDate);
  const cancelApplication = (id) => {
    dispatch(deleteApplication(id));
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>
          Application Status for Job {id}: {status}
        </Card.Title>
        <Card.Text>{job.startDate}</Card.Text>
        <Card.Text>Description: {job.description}</Card.Text>
        <Button variant='primary' onClick={() => cancelApplication(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AppliedJobsBoard;
