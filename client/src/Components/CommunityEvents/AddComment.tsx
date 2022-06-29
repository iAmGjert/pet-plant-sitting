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
  handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AddComment = ({showAddModal, setShowAddModal, handleSubmit, handleCommentChange}: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShowAddModal(!showAddModal);
    setShow(false);
  };
  const handleShow = () => {
    setShowAddModal(!showAddModal);
    setShow(true);
  };

  const handleSendComemnt = () => {
    handleSubmit();
    setShowAddModal(!showAddModal);
  };

  useEffect(() => {
    // handleShow();
  }, []);
  return (
    
    <Modal
      className='bootstrap-card'
      show={showAddModal}
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
            <Form.Control className='button-as-link' as="textarea" rows={3} 
              onChange={handleCommentChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='bootstrap-button' variant="primary" 
          onClick={handleSendComemnt}>Submit</Button>
      </Modal.Footer>
    </Modal>
   
  );

};
export default AddComment;
