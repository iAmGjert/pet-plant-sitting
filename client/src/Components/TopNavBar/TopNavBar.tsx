import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

// type Props = {};

const TopNavBar = () => {
  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>Fern-Herm</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/jobs'>Job Listings</Nav.Link>
              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                <NavDropdown.Item href='/createjob'>Create Job</NavDropdown.Item>
                <NavDropdown.Item href='/community'>
                  Community
                </NavDropdown.Item>
                <NavDropdown.Item href='/calendar'>
                  Calendar
                </NavDropdown.Item>
                <NavDropdown.Item href='/profile'>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/chat'>
                  Chat
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/info'>
                  Info Lookup
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/auth/logout'>
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/map'>
                  Map
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopNavBar;
