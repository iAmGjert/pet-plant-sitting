import React, { useState, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { updateComment } from '../../state/features/events/eventsSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ThemeContext } from '../../App';

type Props = {
  showEditModal: boolean;
  setShowEditModal: (showEditModal: boolean) => void;
  commentObject: {
    id: number;
    event_id: number;
    comment: string;
    user: {
      id: number;
      name: string;
      image: string;
    }
  };
}

const EditComment = ({ showEditModal, setShowEditModal, commentObject }: Props) => {
  const theme = useContext(ThemeContext);
  const currentUser = useAppSelector(state => state.userProfile.value);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [show, setShow] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const handleClose = () => {
    setShowEditModal(!showEditModal);
    setShow(false);
  };

  const [commentMessage, setCommentMessage] = useState('');

  const canSubmit = !!commentMessage && addRequestStatus === 'idle';
  const handleEdit = () => {
    if (canSubmit) {
      try {
        setAddRequestStatus('pending');
        // console.log(commentObject);
        dispatch(updateComment({
          id: commentObject.id,
          comment: commentMessage,
          event_id: commentObject.event_id,
          user_id: currentUser.id,
          user: {
            id: commentObject.user.id,
            name: commentObject.user.name,
            image: commentObject.user.image }
        })).unwrap();     

      } catch (error) {
        setAddRequestStatus('error');
        console.error('Failed to save comment', error);
      } finally {
        setAddRequestStatus('idle');
        setCommentMessage('');
        setShowEditModal(!showEditModal);
      }
    }
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
        <Form className='comment-form'>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            {/* <Form.Label>Edit Comment</Form.Label> */}
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
