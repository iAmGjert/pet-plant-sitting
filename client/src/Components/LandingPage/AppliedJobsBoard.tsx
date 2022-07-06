import React from 'react';
import { useAppDispatch } from '../../state/hooks';
//import moment from 'moment';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteApplication } from '../../state/features/jobs/jobSlice';

const AppliedJobsBoard = ({ job, startDate, petPlants, location, id }) => {
  //console.log(location);
  const dispatch = useAppDispatch();
  //console.log('job in board', job);
  //console.log(id, 'id'); //job id
  // console.log('startDate', startDate);
  const cancelApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  console.log('petPlants', petPlants);
  return (
    <Card className='bootstrap-card'>
      <Card.Body>
        <Card.Title>
          Application Status for Job {job.id}: {job.status}
        </Card.Title>
        <Card.Text>hey</Card.Text>
        <Card.Text>Description: {job.description}</Card.Text>
        <Button
          className='bootstrap-button'
          variant='primary'
          onClick={() => cancelApplication(id)}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AppliedJobsBoard;
