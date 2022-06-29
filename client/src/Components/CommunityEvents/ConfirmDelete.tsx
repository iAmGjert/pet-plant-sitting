import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

type Props = {
  showDeleteModal: boolean;
  setShowDeleteModal: (showDeleteModal: boolean) => void;
  deleteComment: (commentId: number) => Promise<void>;
  // commentId: number;
  // eventId: number;
  commentObject: {
    id: number;
    event_id: number;
    comment: string;
    user: {
      name: string;
      image: string;
    }
  };
  // commentsArray: [{
  //   id: number;
  //   event_id: number;
  //   comment: string;
  //   user: {
  //     name: string;
  //     image: string;
  //   }
  // }];
  // setCommentsArray: (commentsArray: [{
  //   id: number;
  //   event_id: number;
  //   comment: string;
  //   user: {
  //     name: string;
  //     image: string;
  //   }
  // }]) => void;
}


const ConfirmDelete = ({ showDeleteModal, setShowDeleteModal, deleteComment, commentObject}: Props) => {
  const [show, setShow] = useState(false);
  // console.log(show);
  const handleClose = () => {
    setShowDeleteModal(!showDeleteModal);
    setShow(false);
  };
  const handleShow = () => {
    setShowDeleteModal(!showDeleteModal);
    setShow(true);
  };
  const handleConfirmDelete = () => {
    deleteComment(commentObject.id);
    setShowDeleteModal(!showDeleteModal);
  };
  console.log(commentObject);

  return (
    <Modal
      show={showDeleteModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form >
          <Form.Text>
            This action cannot be undone. Are you sure you want to delete this comment?
            
          </Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary'
          onClick={handleClose}
        >Cancel</Button>
         

        <Button variant="primary"
          onClick={handleConfirmDelete}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmDelete;
