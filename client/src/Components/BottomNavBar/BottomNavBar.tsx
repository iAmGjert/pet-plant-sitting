import React, { useEffect, useState, FC } from 'react';
import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Button,
  Alert,
  Breadcrumb,
  Card,
  Form,
} from 'react-bootstrap';
import { changeView, getView } from '../../state/features/jobs/jobSlice';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { useNavigate } from 'react-router-dom';
import landingpage from '../LandingPage/Landing';
import { HouseDoor, PlusLg, Calendar } from 'react-bootstrap-icons';

interface Props {
  theme: string;
}
const BottomNavBar: FC<Props> = ({ theme }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userProfile.value);
  const handleClick = () => {
    // if (user.name.length < 1) {
    //   setLoginPrompt(true);
    //   return;
    // }
    dispatch(changeView('create'));
    navigate('/jobs');
  };
  const [loginPrompt, setLoginPrompt] = useState(false);
  // console.log('user', user);
  return (
    <>
      {loginPrompt ? (
        <Alert
          dismissible
          onClose={() => {
            setLoginPrompt(false);
          }}
          variant='warning'
        >
          You must{' '}
          <Alert.Link
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </Alert.Link>{' '}
          to create a job.
        </Alert>
      ) : ''
      }
      <Navbar
        bg={theme === 'dark' ? 'dark-mode' : 'primary'}
        variant='dark'
        fixed='bottom'
      >
        <Nav className='flex-grow-1 justify-content-evenly'>
          <Nav.Link
            onClick={() => {
              handleClick();
            }}
          >
            <PlusLg className='bottom-navbar-icon' />
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              if (user.name === '') {
                navigate('/');
              } else {
                navigate('/landingPage');
              }
            }}
          >
            <HouseDoor className='bottom-navbar-icon' />
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate('/calendar');
            }}
          >
            <Calendar className='bottom-navbar-icon' />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default BottomNavBar;
