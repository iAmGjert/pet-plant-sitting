import React, {useEffect, useState} from 'react';
import { Navbar, Container, Nav, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { changeView, getView } from '../../state/features/jobs/jobSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { useNavigate } from 'react-router-dom';


// type Props = {}

const BottomNavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state=>state.userProfile.value);
  const handleClick = ()=>{
    // if (user.name.length < 1) {
    //   setLoginPrompt(true);
    //   return;
    // }
    dispatch(changeView('create'));
    navigate('/jobs');
  };
  const [loginPrompt, setLoginPrompt] = useState(false);
  
  return (
    <div>
      {
        loginPrompt ?
          <Alert dismissible onClose={ ()=>{ setLoginPrompt(false); } } variant='warning'>You must {' '}<Alert.Link onClick={()=>{ navigate('/login'); }}>Login</Alert.Link> to create a job.</Alert> :
          <div />
      }
      <Navbar
        bg='primary'
        variant='dark'
        fixed='bottom'
        className='d-lg-none d-xl-none'
      >
        <Container>
          <Nav className='me-auto'>
            <Nav.Link onClick={()=>{ handleClick(); }} >Create Job</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/'); }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/calendar'); }}>Calendar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default BottomNavBar;
