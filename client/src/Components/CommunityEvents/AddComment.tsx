import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setView } from '../../state/features/events/eventsSlice';
import Form from 'react-bootstrap/Form';

type Props = {
  showAddModal: boolean;
  setShowAddModal: (showAddModal: boolean) => void;
  handleSubmit: () => void;
}

const AddComment = ({showAddModal, setShowAddModal, handleSubmit}: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSendComemnt = () => {
    handleSubmit();
    setShow(false);
  };

  useEffect(() => {
    handleShow();
  }, []);
  return (
    
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            {/* <Form.Label>Example textarea</Form.Label> */}
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" 
          onClick={handleSendComemnt}>Submit</Button>
      </Modal.Footer>
    </Modal>
   
  );

};
export default AddComment;
