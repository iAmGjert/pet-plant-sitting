import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

type Props = {
  showAddModal: boolean;
  setShowAddModal: (showAddModal: boolean) => void;
  handleSubmit: () => void;
  handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  canSubmit: boolean;
}

const AddComment = ({showAddModal, setShowAddModal, handleSubmit, handleCommentChange, canSubmit}: Props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShowAddModal(!showAddModal);
    setShow(false);
  };

  const handleSendComemnt = () => {
    handleSubmit();
    setShowAddModal(!showAddModal);
  };

  return (
    <Modal
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
            <Form.Control as="textarea" rows={3} 
              onChange={handleCommentChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" disabled={!canSubmit}
          onClick={handleSendComemnt}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddComment;
