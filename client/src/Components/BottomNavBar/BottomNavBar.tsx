import React from 'react';
import { Navbar, Container, Nav, Collapse } from 'react-bootstrap';

// type Props = {}

const BottomNavBar = () => {
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
            <Nav.Link href='/createjob'>Create Job</Nav.Link>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/calendar'>Calendar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default BottomNavBar;
