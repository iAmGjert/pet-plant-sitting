import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { changeView } from '../../state/features/jobs/jobSlice';
import { useAppDispatch } from '../../state/hooks';
import { useNavigate } from 'react-router-dom';

// type Props = {}

const BottomNavBar = () => {
  const dispatch = useAppDispatch();
  const navi = useNavigate();
  const handleClick = ()=>{
    dispatch(changeView('create'));
    navi('/jobs');
  };
  return (
    <div>
      <Navbar
        bg='primary'
        variant='dark'
        fixed='bottom'
        className='d-lg-none d-xl-none'
      >
        <Container>
          <Nav className='me-auto'>
            <Nav.Link onClick={()=>{ handleClick(); }} >Create Job</Nav.Link>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/calendar'>Calendar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default BottomNavBar;
