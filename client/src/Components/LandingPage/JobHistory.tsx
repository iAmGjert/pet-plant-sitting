import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { ThemeContext } from '../../App';

const JobHistory = ({ sitterWorkHistory }) => {
  // console.log('sitterWorkHistory in jobHistory', sitterWorkHistory);
  const theme = useContext(ThemeContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className='landing-sitting-history-btn bootstrap-button'
        variant='primary'
        onClick={handleShow}
      >
        Sitting History
      </Button>

      <Modal
        contentClassName={theme === 'dark' && 'dark'}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton className={theme === 'dark' && 'btn-close-white'}>
          <Modal.Title className='landing-job-history-modal-title'>
            Previous Work History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='landing-job-history-modal-body'>
          {sitterWorkHistory.map(
            ({ startDate, endDate, description, job_pets_plants, id }) => {
              return (
                <div key={id}>
                  <h2>
                    Past Sitting For{' '}
                    {job_pets_plants.map((pet) => {
                      return `${pet.pet_plant.name} | `;
                    })}{' '}
                  </h2>

                  <img
                    className='job-history-image'
                    src={
                      job_pets_plants.map((pet) => {
                        return pet.pet_plant.image;
                      })[0]
                    }
                    alt=''
                  />

                  <p className='job-history-about'>
                    Description:{' '}
                    {job_pets_plants.map((pet) => {
                      return `${pet.pet_plant.name} | `;
                    })}
                    {job_pets_plants.map((pet) => {
                      return pet.pet_plant.bio;
                    })}{' '}
                  </p>

                  <p>
                    Species:{' '}
                    {job_pets_plants.map((pet) => {
                      return pet.pet_plant.species;
                    })}
                  </p>

                  <p className='job-history-date'>
                    This sitting took place:{' '}
                    {`${moment(startDate).format(
                      'dddd MMMM Do, YYYY'
                    )} to ${moment(endDate).format('dddd MMMM Do, YYYY')}`}{' '}
                  </p>
                  <p className='job-history-lines'>-------------------</p>
                </div>
              );
            }
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={theme === 'dark' && 'bootstrap-modal-button'}
            variant='secondary'
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default JobHistory;
