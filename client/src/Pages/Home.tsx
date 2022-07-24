import React, { FC, useState, useEffect, useContext } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { fetchUpcomingEvents } from '../state/features/events/eventsSlice';
import { ThemeContext } from '../App';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: FC<Props> = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //const [display, setDisplay] = useState(false);
  const upcomingEvents = useAppSelector((state) => state.events.upcomingEvents);
  //console.log('upcomingEvents', upcomingEvents);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mappedEvents = upcomingEvents
    .map((event: Event) => {
      return {
        title: event.name,
        startDate: event.startDate,
        description: event.description,
        startTime: event.startTime,
      };
    })
    .slice(0, 1);
  console.log('mappedEvents', mappedEvents);

  useEffect(() => {
    dispatch(fetchUpcomingEvents());
  }, []);

  return (
    <Container fluid className='home-container'>
      <h1 className='home-header'>Welcome to</h1>
      <h1 className='home-fern-herm'>Fern Herm</h1>

      <img
        className='home-logo'
        src={require('../Components/LandingPage/Logo.svg')}
        width={300}
        height={300}
        alt=''
        style={{
          filter: theme === 'dark' && 'invert(100%)',
        }}
      />

      <Carousel fade>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>Mr. Whiskers</h3>
            <p>This cat is all smiles</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1920%2C1920&ssl=1'
            alt='Second slide'
          />

          <Carousel.Caption>
            <h3>Felix</h3>
            <p>Loves to cuddle!</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://media.istockphoto.com/photos/pure-joy-picture-id519709986?k=20&m=519709986&s=612x612&w=0&h=IwCN9wp0L2Pt4gXHzP5HojZqO3JkTC82uUJcw4GBHi8='
            alt='Third slide'
          />
          <Carousel.Caption>
            <h3>Ronnie</h3>
            <p>The goodest boy to sit for!</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className='d-block w-100'
            src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/plant-names-1650565348.jpg?resize=768:*'
            alt='Fourth slide'
          />
          <Carousel.Caption>
            <h3>Benedict the Cactus</h3>
            <p>Thrives on neglect</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <p className='home-description'>
        Fern-Herm is your one-stop shop to find a sitter for your lovely plants
        and animals! Fern-Herm will help connect you with locals that are ready
        to help.
      </p>

      <div>
        <Button
          className='home-login-btn'
          variant='primary'
          size='sm'
          onClick={() => navigate('/login')}
          style={{ marginRight: '5px' }}
        >
          Login
        </Button>
        <Button
          className='home-events-btn'
          variant='primary'
          size='sm'
          onClick={handleShow}
        >
          Events
        </Button>

        <Offcanvas className='offcanvas' show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className='offcanvas-title'>
              Next Free Community Event:
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {mappedEvents.map((element) => {
              return (
                <h1 className='home-offcanvas-event-title'>{element.title}</h1>
              );
            })}

            {mappedEvents.map((element) => {
              return (
                <p className='offcanvas-event-date'>
                  {moment(element.startDate).format('dddd, MMMM Do YYYY')}
                </p>
              );
            })}

            {mappedEvents.map((element) => {
              return (
                <p className='home-offcanvas-event-description'>
                  {element.description}
                </p>
              );
            })}

            {mappedEvents.map((element) => {
              return (
                <p>{moment(element.startTime, 'HH:mm:ss').format('LT')}</p>
              );
            })}
            <Button className='offcanvas-more-events-btn' href='/events'>
              More Free Events
            </Button>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      {/* <div>
            <Card.Link className='button-as-link' href='/events'>Free Community Events</Card.Link>
          </div> */}
    </Container>
  );
};

export default Home;
