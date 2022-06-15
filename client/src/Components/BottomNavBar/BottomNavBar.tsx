import React from 'react';
import { Navbar, Container, Nav, Collapse } from 'react-bootstrap';

// type Props = {}

const BottomNavBar = () => {
  return (
    <div>
<<<<<<< HEAD
      <Navbar
        bg='primary'
        variant='dark'
        fixed='bottom'
        className='d-lg-none d-xl-none'
      >
        <Container>
          <Nav className='me-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
=======
      <Collapse in={true} className='.d-none'>
        <Navbar bg='primary' variant='dark' fixed='bottom'>
          <Container>
            <Nav className='me-auto'>
              <Nav.Link href='/createjob'>Create Job</Nav.Link>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/calendar'>Calendar</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Collapse>
>>>>>>> daf482ef71a641450f760c9c43981b0bc1ea30f4
    </div>
  );
};

export default BottomNavBar;
