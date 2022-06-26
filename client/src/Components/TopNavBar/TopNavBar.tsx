import React, { FC } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { changeView } from '../../state/features/jobs/jobSlice';
import { useNavigate } from 'react-router-dom';
import Theme from '../Theme/Theme';

interface Props {
  theme: string
  toggleTheme: any
}

const TopNavBar: FC<Props> = ({ toggleTheme, theme }) => {
  const user = useAppSelector((state) => state.userProfile.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = ()=>{
    dispatch(changeView('create'));
    navigate('/jobs');
  };

  return (
    <Navbar className='topNavBar' bg='primary' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand onClick={()=>{ navigate('/'); }}>
          {user.name ? user.name : 'Fern Herm'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link onClick={()=>{ dispatch(changeView('list')); navigate('/jobs'); }}>Job Listings</Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              {!user.name && (
                <NavDropdown.Item onClick={()=>{ navigate('/login'); }}>Login</NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={()=>{ handleClick(); }}>
                  Create Job
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{ navigate('/events'); }}>Community</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{ navigate('/map'); }}>Map</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{ navigate('/calendar'); }}>Calendar</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{ navigate(`/profile/${user?.id}`); }}>
                  Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{ navigate('/chat'); }}>Chat</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{ navigate('/info'); }}>Info Lookup</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item ><Theme toggleTheme={toggleTheme} theme={theme} /></NavDropdown.Item>
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
  );
};

export default TopNavBar;
