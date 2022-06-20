import React, { useEffect, useState } from 'react';
import Create from '../Components/JobListings/Create';
import List from '../Components/JobListings/List';
import Search from '../Components/JobListings/Search';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { changeView, setJobs } from '../state/features/jobs/jobSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobsMain = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const view = useAppSelector((state)=>state.job.view);
  const user = useAppSelector(state=>state.userProfile.value);
  const [loginPrompt, setLoginPrompt] = useState(false);

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
  useEffect(()=>{
    getJobs();
  }, []);

  return (
    <Container fluid>
      {
        view === 'create' ?
          <Create /> :
          <div>
            <Search />
            <List />
          </div>
      }
      {
        loginPrompt ?
          <Alert dismissible onClose={ ()=>{ setLoginPrompt(false); } } variant='warning'>You must {' '}<Alert.Link onClick={()=>{ navigate('/login'); }}>Login</Alert.Link> to create a job.</Alert> :
          <div />
      }
      <Button onClick={()=>{ handleClick(); }}>{view === 'create' ? 'Return to Job List' : 'Create New Job'}</Button>
    </Container>
  );
};

export default JobsMain;
