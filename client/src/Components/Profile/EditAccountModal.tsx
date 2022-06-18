import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../../Pages/Profile';
import EditField from './EditField';

type Props = {
  user: Profile;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const EditAccountModal = ({ user, showModal, setShowModal }: Props) => {
  // loop through fields on a user and create a form field for each
  const navigate = useNavigate();
  const userFields = [];
  for (const field in user) {
    if (
      field !== 'id' &&
      field !== 'createdAt' &&
      field !== 'updatedAt' &&
      field !== 'average_rating' &&
      field !== 'gallery_id' &&
      field !== 'sitter_rating' &&
      field !== 'total_ratings' &&
      field !== 'total_sitter_ratings' &&
      field !== 'ratings'
    ) {
      userFields.push([field, user[field as keyof typeof user]]);
    }
  }

  const handleOnHide = () => {
    setShowModal(false);
    navigate(`/profile/${user.id}`);
  };

  return (
    <Modal
      // backdrop='static'
      show={showModal}
      fullscreen={true}
      onHide={() => handleOnHide()}
    >
      <Modal.Header>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {userFields.map(([field, value], i) => {
            const fieldName = String(field);
            return (
              <EditField
                key={'field' + i}
                fieldName={fieldName}
                value={value}
                user={user}
                Pet_Plant={null}
              />
            );
          })}
          <Button
            variant='success'
            type='submit'
            onClick={() => handleOnHide()}
          >
            Finished
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAccountModal;
