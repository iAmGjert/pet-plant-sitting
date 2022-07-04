import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ThemeContext } from '../../App';

type Props = {
  showAddModal: boolean;
  setShowAddModal: (showAddModal: boolean) => void;
  handleSubmit: () => void;
  handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  canSubmit: boolean;
}

const AddComment = ({showAddModal, setShowAddModal, handleSubmit, handleCommentChange}: Props) => {
  const theme = useContext(ThemeContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      contentClassName={theme === 'dark' && 'dark'}
      show={showAddModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false} >
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control className={theme === 'dark' && 'bootstrap-modal-textbox'} 
              as="textarea" 
              rows={3} 
              onChange={handleCommentChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className={theme === 'dark' && 'bootstrap-modal-button'} 
          variant="primary" 
          onClick={handleSendComemnt}>
            Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddComment;
