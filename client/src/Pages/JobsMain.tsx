import React, { useEffect, useState } from 'react';
import Create from '../Components/JobListings/Create';
import List from '../Components/JobListings/List';
import Search from '../Components/JobListings/Search';
import Loading from '../Components/JobListings/Loading';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { changeView, setJobs, setPrompt } from '../state/features/jobs/jobSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobsMain = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const view = useAppSelector((state)=>state.job.view);
  const user = useAppSelector(state=>state.userProfile.value);

  const handleClick = () => {
    if (view !== 'create') {
      dispatch(changeView('create'));
      return;
    }
    dispatch(changeView('list'));
  };
  const getJobs = async () => {
    const jobs = await axios.get(
      '/api/jobs/all'
    );
    dispatch(setJobs(jobs.data));
  };

  return (
    <Container fluid>
      {
        view === 'create' ?
          <Create /> :
          <div>
            <List />
          </div>
      }
      <Button className='bootstrap-button' onClick={()=>{ handleClick(); }}>{view === 'create' ? 'Return to Job List' : 'Create New Job'}</Button>
    </Container>
  );
};

export default JobsMain;
