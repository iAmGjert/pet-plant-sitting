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
      <Row>
        <Col className='text-center'>Welcome to Fern Herm!</Col>
      </Row>
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
            src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/plant-names-1650565348.jpg?resize=768:*'
            alt='Third slide'
          />
          <Carousel.Caption>
            <h3>Benedict the Cactus</h3>
            <p>Thrives on neglect</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Card className='bootstrap-card' style={{ width: '18rem' }}>
        <Card.Body>
          {/* <Card.Title>Card Title</Card.Title> */}
          {/* <Card.Subtitle className='mb-2 text-muted'> */}
          {/* Card Subtitle
          </Card.Subtitle> */}
          <Card.Text>
            Fern-Herm is your one stop shop to find a sitter for your lovely
            plants and animals while you are too busy to manage! Fern-Herm will
            help you connect with locals who are willing to help!
          </Card.Text>
          <Button
            className='bootstrap-button'
            variant='primary'
            size='lg'
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Card.Link className='button-as-link' href='/events'>Free Community Events</Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
