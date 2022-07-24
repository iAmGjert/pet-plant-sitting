import React, { FC, useRef } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { changeView } from '../../state/features/jobs/jobSlice';
import { useNavigate } from 'react-router-dom';
import Theme from '../Theme/Theme';
import { setView } from '../../state/features/events/eventsSlice';
interface Props {
  theme: string;
  toggleTheme: any;
}

const TopNavBar: FC<Props> = ({ toggleTheme, theme }) => {
  const user = useAppSelector((state) => state.userProfile.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navButton = useRef(null);
  const linksContainerRef = useRef(null);

  const collapseNav = () => {
    navButton.current.classList.add('collapsed');
    linksContainerRef.current.classList.remove('show');
  };

  return (
    <Navbar
      collapseOnSelect
      bg={theme === 'dark' ? 'dark-mode' : 'primary'}
      variant='dark'
      expand='lg'
    >
      <Container>
        <Navbar.Brand
          style={{ cursor: 'pointer' }}
          onClick={() => {
            user.name ? navigate('/landingPage') : navigate('/');
          }}
        >
          {user.name ? (
            user.name
          ) : (
            <img
              src={require('../../../Public/svg/fern-herm-pets-alt.svg')}
              alt='fh-alt'
              style={{
                width: '50px',
                height: '50px',
                marginLeft: '15px',
                filter: 'invert(100%)',
              }}
            />
          )}
        </Navbar.Brand>
        <Navbar.Brand
          className='ms-auto'
          style={{ marginRight: '15px', marginLeft: '15px' }}
        >
          <Theme toggleTheme={toggleTheme} theme={theme} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          ref={navButton}
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
        />
        <Navbar.Collapse id='basic-navbar-nav' ref={linksContainerRef}>
          <Nav className='flex-grow-1 justify-content-evenly'>
            {!user.name && (
              <Nav.Link
                onClick={() => {
                  navigate('/login');
                  collapseNav();
                }}
              >
                Login
              </Nav.Link>
            )}
            <Nav.Link
              onClick={() => {
                dispatch(changeView('list'));
                navigate('/jobs');
                collapseNav();
              }}
            >
              Job Listings
            </Nav.Link>
            {/* <NavDropdown title='More Options' id='basic-nav-dropdown'> */}

            {/* <Nav.Link
              onClick={() => {
                handleClick();
              }}
            >
                Create Job
            </Nav.Link> */}
            <Nav.Link
              onClick={() => {
                dispatch(setView('list'));
                navigate('/events');
                collapseNav();
              }}
            >
              Community
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/map');
                collapseNav();
              }}
            >
              Map
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/calendar');
                collapseNav();
              }}
            >
              Calendar
            </Nav.Link>
            {user.name && (
              <Nav.Link
                onClick={() => {
                  navigate(`/profile/${user?.id}`);
                  collapseNav();
                }}
              >
                Profile
              </Nav.Link>
            )}
            <Nav.Link
              onClick={() => {
                navigate('/chat');
                collapseNav();
              }}
            >
              Chat
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/info');
                collapseNav();
              }}
            >
              Info Lookup
            </Nav.Link>
            {user.name && (
              <>
                <NavDropdown.Divider />
                <Nav.Link href='/auth/logout'>Logout</Nav.Link>
              </>
            )}
            {/* </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavBar;
