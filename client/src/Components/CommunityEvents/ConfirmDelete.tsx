import React, { useState, useContext } from 'react';
import { useAppDispatch } from '../../state/hooks';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ThemeContext } from '../../App';
import { deleteComment } from '../../state/features/events/eventsSlice';


type Props = {
  showDeleteModal: boolean;
  setShowDeleteModal: (showDeleteModal: boolean) => void;
  commentObject: {
    id: number;
    event_id: number;
    comment: string;
    user_id: number;
    user: {
      id: number;
      name: string;
      image: string;
    };
  };
};

const ConfirmDelete = ({ showDeleteModal, setShowDeleteModal, commentObject }: Props) => {
  const theme = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  // console.log(show);
  const handleClose = () => {
    setShowDeleteModal(!showDeleteModal);
    setShow(false);
  };
 
  const handleConfirmDelete = () => {
    try {
      dispatch(deleteComment(commentObject)).unwrap();
    } catch (error) {
      console.error('Failed to delete comment', error);
    } finally {
      setShowDeleteModal(!showDeleteModal);
      setShow(false);
    }

  };

  return (
    <Modal
      contentClassName={theme === 'dark' && 'dark'}
      show={showDeleteModal}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Text>
            This action cannot be undone. Are you sure you want to delete this
            comment?
          </Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className={theme === 'dark' && 'bootstrap-modal-button'} variant='primary' onClick={handleClose}>
          Cancel
        </Button>

        <Button className={theme === 'dark' && 'bootstrap-modal-button'} variant='primary' 
          onClick={handleConfirmDelete}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmDelete;
