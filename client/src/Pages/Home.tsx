import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: FC<Props> = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const user = useAppSelector((state) => state.userProfile.value);
  const users = useAppSelector((state) => state.userProfile.users);
  const petPlants = useAppSelector((state) => state.petPlant.petPlants);
  const jobs = useAppSelector((state) => state.job.jobs);
  const handleClick = () => {
    // console.log(user);
    // setDisplay(!display);
  };
  return (
    <Container fluid>
      {/* <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          padding: 10px 20px,
        }}
      >
        Welcome to
      </h1> */}
      <h1 className='home-header'>Welcome to</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <img
          src='https://64.media.tumblr.com/290a29bc6dcf179117ab4933ff583acc/4677f106597bcd32-27/s500x750/69d26528d580d86580d284278eb83b373a0a7435.jpg'
          width={300}
          height={300}
          alt=''
        />
      </div>
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
            <p>All smiles!</p>
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
      <div className='home-description'>
        Fern-Herm is your one-stop shop to find a sitter for your lovely plants
        and animals! Fern-Herm will help connect you with locals that are ready
        to help.
      </div>
      <Button
        className='bootstrap-button'
        variant='primary'
        size='sm'
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
      {/* <div>
            <Card.Link className='button-as-link' href='/events'>Free Community Events</Card.Link>
          </div> */}
    </Container>
  );
};

export default Home;
