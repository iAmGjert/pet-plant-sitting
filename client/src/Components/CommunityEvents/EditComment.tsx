import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ThemeContext } from '../../App';

type Props = {
  showEditModal: boolean;
  setShowEditModal: (showEditModal: boolean) => void;
  editComment: (commentId: number, commentMessage: string) => void;
  commentObject: {
    id: number;
    event_id: number;
    comment: string;
    user: {
      name: string;
      image: string;
    }
  };
}

const EditComment = ({ showEditModal, setShowEditModal, editComment, commentObject }: Props) => {
  const theme = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShowEditModal(!showEditModal);
    setShow(false);
  };
  console.log(commentObject);

  const [commentMessage, setCommentMessage] = useState('');

  const handleEdit = (event: any): void => {
    event.preventDefault();
    editComment(commentObject.id, commentMessage);
    setShowEditModal(!showEditModal);
  };

  return (
    <Modal
      contentClassName={theme === 'dark' && 'dark'}
      show={showEditModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>

      <Modal.Header closeButton>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Edit Comment</Form.Label>
            <Form.Control className={theme === 'dark' && 'bootstrap-modal-textbox'} as="textarea" rows={3} 
              name="comment"
              defaultValue={commentObject?.comment}
              onChange={(e) => {
                setCommentMessage(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className={theme === 'dark' && 'bootstrap-modal-button'} variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditComment;
