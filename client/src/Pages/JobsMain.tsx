import React, { useEffect, useState, useRef } from 'react';
import Create from '../Components/JobListings/Create';
import List from '../Components/JobListings/List';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Overlay } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { changeView, setJobs, setPrompt } from '../state/features/jobs/jobSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobsMain = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const view = useAppSelector((state)=>state.job.view);
  const user = useAppSelector(state => state.userProfile.value);
  const getJobs = async () => {
    const jobs = await axios.get('/api/jobs/all');
    dispatch(setJobs(jobs.data));
  };
  const handleClick = () => {
    if (user.name === '') {
      navigate('/login');
    }
    if (view !== 'create') {
      dispatch(changeView('create'));
      return;
    }
    dispatch(changeView('list'));
  };

  useEffect(()=>{
    getJobs();
  }, []);

  const [showCreated, setShowCreated] = useState(false);
  const [showRevoked, setShowRevoked] = useState(false);
  const [showApplied, setShowApplied] = useState(false);
  const target = useRef(null);
  const removeCreatedOverlay = ()=>{ setTimeout(()=>{ setShowCreated(false); }, 4500); };
  const removeAppliedOverlay = ()=>{ setTimeout(()=>{ setShowApplied(false); }, 4500); };
  const removeRevokedOverlay = ()=>{ setTimeout(()=>{ setShowRevoked(false); }, 4500); };
  useEffect(()=>{
    removeCreatedOverlay();
  }, [showCreated]);
  useEffect(()=>{
    removeAppliedOverlay();
  }, [showApplied]);
  useEffect(()=>{
    removeRevokedOverlay();
  }, [showRevoked]);
  return (
    <Container fluid ref={target}>
      <Overlay target={target.current} show={showCreated} placement="top">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 255, 100, 0.85)',
              padding: '2px 10px',
              color: 'black',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Job Created!
          </div>
        )}
      </Overlay>
      <Overlay target={target.current} show={showApplied} placement="top">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(100, 255, 100, 0.85)',
              padding: '2px 10px',
              color: 'black',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Application Submitted!
          </div>
        )}
      </Overlay>
      <Overlay target={target.current} show={showRevoked} placement="top">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            Application Revoked!
          </div>
        )}
      </Overlay>
      {
        view === 'create' ?
          <Create setShowCreated={setShowCreated}/> :
          <div>
            <List setShowApplied={setShowApplied} setShowRevoked={setShowRevoked}/>
          </div>
      }
      
      <Button className='bootstrap-button' onClick={()=>{ handleClick(); }}>{view === 'create' ? 'Return to Job List' : user.name === '' ? 'Login' : 'Create New Job'}</Button>
    </Container>
  );
};

export default JobsMain;
