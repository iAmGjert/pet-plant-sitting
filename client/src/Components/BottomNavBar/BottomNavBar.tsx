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
  //console.log('user', user);
  return (
    <div>
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
      ) : (
        <div />
      )}
      <Navbar
        bg={theme === 'dark' ? 'dark-mode' : 'primary'}
        variant='dark'
        fixed='bottom'
      >
        <Container>
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                handleClick();
              }}
            >
              Create Job
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
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/calendar');
              }}
            >
              Calendar
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default BottomNavBar;
