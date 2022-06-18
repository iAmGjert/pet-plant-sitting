import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const LoginPrompt = () => {
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
    window.open('https://medium.com/@m.opthoog/why-i-hate-puppies-and-you-should-too-2fff78c5904d', '_blank');
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
          No, Thnaks
          </Button>
          <Button variant="primary" onClick={handleLoginRoute}>Take Me There</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginPrompt;

