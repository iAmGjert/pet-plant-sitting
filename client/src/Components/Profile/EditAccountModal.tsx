import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Profile } from '../../Pages/Profile';

type Props = {
  user: Profile;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const EditAccountModal = ({ user, showModal, setShowModal }: Props) => {
  return (
    <Modal
      show={showModal}
      fullscreen={true}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='Enter email' />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAccountModal;
