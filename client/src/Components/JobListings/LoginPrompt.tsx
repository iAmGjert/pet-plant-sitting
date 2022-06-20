import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { changeView, } from '../../state/features/jobs/jobSlice';

const LoginPrompt = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoginRoute = () => {
    handleClose();
    navigate('/login');
    // window.location.href = '/login';
  };
  const handleOtherRoute = () => {
    handleClose();
    dispatch(changeView('list'));
  };

  useEffect(() => {
    handleShow();
  }, []);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Redirect</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please Login or Signup to create an event. 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOtherRoute}>
          No, Thanks
          </Button>
          <Button variant="primary" onClick={handleLoginRoute}>Take Me There</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginPrompt;

