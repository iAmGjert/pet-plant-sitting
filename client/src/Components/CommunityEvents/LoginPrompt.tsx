import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setView } from '../../state/features/events/eventsSlice';
import { ThemeContext } from '../../App';

const LoginPrompt = () => {
  const theme = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const view = useAppSelector((state) => state.events.view);
  // console.log(view);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeView = (option: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(setView(option));
  };

  const handleLoginRoute = () => {
    handleClose();
    navigate('/login');
    // window.location.href = '/login';
  };

  const handleSignupRoute = () => {
    handleClose();
    navigate('/register');
  };

  const handleOtherRoute = () => {
    changeView('list');
    handleClose();
    navigate('/events');
  };

  useEffect(() => {
    handleShow();
  }, []);
  return (
    <>
      <Modal
        contentClassName={theme === 'dark' && 'dark'}
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton className={theme === 'dark' && 'btn-close-white'}>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Login or Signup to create an event.</Modal.Body>
        <Modal.Footer>
          <Button
            className={theme === 'dark' && 'bootstrap-modal-button'}
            variant='secondary'
            onClick={handleOtherRoute}
          >
            Keep Viewing Events
          </Button>
          <Button
            className={theme === 'dark' && 'bootstrap-modal-button'}
            variant='info'
            onClick={handleSignupRoute}
          >
            Signup
          </Button>
          <Button
            className={theme === 'dark' && 'bootstrap-modal-button'}
            variant='info'
            onClick={handleLoginRoute}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginPrompt;
