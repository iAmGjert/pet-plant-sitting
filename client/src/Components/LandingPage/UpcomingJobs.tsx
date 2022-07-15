import React, { FC, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as moment from 'moment';
//Redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

import { ThemeContext } from '../../App';

//typescript
interface upcomingJobs {
  id: number;
  location: string;
  employer_id: number;
  sitter_id: number | null;
  startDate: Date;
  endDate: Date;
  pet_plant: Array<number>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const upcomingJobs: FC<Props> = ({
  startDate,
  endDate,
  employer_id,
  location,
  petPlant, //supposed to be an array
}) => {
  console.log('petPlant in upcoming jobs', petPlant);

  const theme = useContext(ThemeContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card className='landing-upcomingjobs-card'>
      <Card.Body>
        <Card.Title className='landing-upcomingjob-title'>
          Your Next Sitting:{' '}
          {petPlant
            .map((pet) => {
              return pet.pet_plant.name;
            })
            .join(' | ')}
        </Card.Title>
        {/* <Card.Img
          src={petPlant.map((pet) => {
            return pet.pet_plant.image;
          })}
        /> */}
        {petPlant.map((pet) => {
          return <Card.Img src={pet.pet_plant.image} key={pet.id} />;
        })}
        <Card.Text>{`${moment(startDate).format(
          'dddd MMMM Do, YYYY'
        )} to ${moment(endDate).format('dddd MMMM Do, YYYY')}`}</Card.Text>
        <>
          <Button
            className='bootstrap-button'
            variant='primary'
            onClick={handleShow}
          >
            More Info
          </Button>

          <Modal
            contentClassName={theme === 'dark' && 'dark'}
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {' '}
                {petPlant
                  .map((pet) => {
                    return pet.pet_plant.name;
                  })
                  .join(' | ')}{' '}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>Location of Sitting: {location}</Modal.Body>
            {petPlant.map((pet) => (
              <div className='pet_container' key={pet.pet_plant.name}>
                <p>Name: {pet.pet_plant.name}</p>
                <p>Bio: {pet.pet_plant.bio}</p>
                <p>Species: {pet.pet_plant.species}</p>
              </div>
            ))}

            <Modal.Footer>
              <Button
                className={theme === 'dark' && 'bootstrap-modal-button'}
                variant='secondary'
                onClick={handleClose}
              >
                Close
              </Button>
              {/* <Button variant='primary' onClick={handleClose}>
                Save Changes
              </Button> */}
            </Modal.Footer>
          </Modal>
        </>
      </Card.Body>
    </Card>
  );
};

export default upcomingJobs;
