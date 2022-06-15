import React from 'react';
import { Navbar, Container, Nav, Collapse } from 'react-bootstrap';

// type Props = {}

const BottomNavBar = () => {
  return (
    <div>
      <Collapse in={true} className='.d-none'>
        <Navbar bg='primary' variant='dark' fixed='bottom'>
          <Container>
            <Nav className='me-auto'>
              <Nav.Link href='createjob'>Create Job</Nav.Link>
              <Nav.Link href='home'>Home</Nav.Link>
              <Nav.Link href='calendar'>Calendar</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Collapse>
    </div>
  );
};

export default BottomNavBar;
