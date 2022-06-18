import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useAppSelector } from '../../state/hooks';

// type Props = {};

const TopNavBar = () => {
  const user = useAppSelector((state) => state.userProfile.value);
  return (
    <div>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>
            {user.name ? user.name : 'Fern Herm'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/jobs'>Job Listings</Nav.Link>
              <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
                {!user.name && (
                  <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
                )}
                <NavDropdown.Item href='/jobs'>
                  Create Job
                </NavDropdown.Item>
                <NavDropdown.Item href='/events'>Community</NavDropdown.Item>
                <NavDropdown.Item href='/calendar'>Calendar</NavDropdown.Item>
                <NavDropdown.Item href={`/profile/${user?.id}`}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/chat'>Chat</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/info'>Info Lookup</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/map'>Map</NavDropdown.Item>
                {user.name && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/auth/logout'>
                      Logout
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopNavBar;
