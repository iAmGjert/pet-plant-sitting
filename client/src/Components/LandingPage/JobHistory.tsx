import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { ThemeContext } from '../../App';

const JobHistory = ({ startDate, endDate, description, petPlants }) => {
  const theme = useContext(ThemeContext);
  console.log('petPlants in history', petPlants);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Sitting History
      </Button>

      <Modal contentClassName={theme === 'dark' && 'dark'} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Previous Work History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Siting for{' '}
          {petPlants.map((pet) => {
            return `${pet.pet_plant.name} | `;
          })}{' '}
          <p>{description}</p>
          <p>{`${moment(startDate).format('dddd MMMM Do, YYYY')} to ${moment(
            endDate
          ).format('dddd MMMM Do, YYYY')}`}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className={theme === 'dark' && 'bootstrap-modal-button'} variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobHistory;
