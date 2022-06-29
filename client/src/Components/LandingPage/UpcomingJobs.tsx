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
  petPlant,
}) => {
  const jobs = useAppSelector((state) => state.job.jobs);

  console.log(38, petPlant);

  console.log(
    35,
    petPlant.map((pet) => {
      return pet.pet_plant.name;
    })
  );

  // console.log(45,
  //   petPlant.map((pet) => {
  //     return pet.pet_plant.image;
  //   })
  //   );

  //date checking
  // const currentDate = moment().format('L');
  // console.log(44, currentDate);
  // // console.log(44, moment().format('YYYY MM dd'));
  // endDate = moment(endDate).format('L');
  // console.log(49, endDate);
  // console.log(moment(currentDate).isBefore(moment(endDate)));

  const theme = useContext(ThemeContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //moment(eventObj.startDate).format('dddd, MMMM Do YYYY')
  //new Date(jobPopup.endDate).toLocaleDateString()

  return (
    <Card className='bootstrap-card'>
      <Card.Body>
        <Card.Title>
          Your Next Job:{' '}
          {petPlant.map((pet) => {
            //return pet.pet_plant.name;
            return `${pet.pet_plant.name} | `;
          })}{' '}
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
        <Card.Link className='button-as-link' href='#'>Visit Profile</Card.Link>
        <>
          <Button className='bootstrap-button' variant='primary' onClick={handleShow}>
            More Info
          </Button>

          <Modal contentClassName={theme === 'dark' && 'dark'} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {' '}
                {
                  petPlant.map((pet) => {
                    return pet.pet_plant.name;
                  })[0]
                }{' '}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{location}</Modal.Body>
            <Modal.Footer>
              <Button className={theme === 'dark' && 'bootstrap-modal-button'} variant='secondary' onClick={handleClose}>
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
