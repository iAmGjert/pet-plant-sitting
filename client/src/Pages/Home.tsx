import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Home: FC<Props> = () => {
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
    <Carousel fade>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'
          alt='First slide'
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://i0.wp.com/katzenworld.co.uk/wp-content/uploads/2019/06/funny-cat.jpeg?fit=1920%2C1920&ssl=1'
          alt='Second slide'
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='https://i.ytimg.com/vi/YSHDBB6id4A/maxresdefault.jpg'
          alt='Third slide'
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Home;
