import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

const JobHistory = ({ startDate, endDate, description, petPlants }) => {
  //console.log('petPlants in history', petPlants);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Sitting History
      </Button>

      <Modal show={show} onHide={handleClose}>
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
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobHistory;
