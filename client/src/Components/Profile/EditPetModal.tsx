import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import EditField from './EditField';
import { PetPlant } from './PetPlantCard';
import { ThemeContext } from '../../App';

type Props = {
  PetPlant: PetPlant;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  add: boolean;
  newPetId: number;
};

const EditPetModal = ({
  PetPlant,
  showModal,
  setShowModal,
  add,
  newPetId,
}: Props) => {
  const theme = useContext(ThemeContext);
  const petPlantFields = [];
  for (const field in PetPlant) {
    if (
      field !== 'id' &&
      field !== 'createdAt' &&
      field !== 'updatedAt' &&
      field !== 'average_rating' &&
      field !== 'is_plant' &&
      field !== 'total_ratings' &&
      field !== 'ratings' &&
      field !== 'rating' &&
      field !== 'owner_id'
    ) {
      petPlantFields.push([field, PetPlant[field as keyof typeof PetPlant]]);
    }
  }
  const handleOnHide = () => {
    setShowModal(false);
    // navigate(`/profile/${PetPlant.owner_id}`);
  };

  const handleDelete = () => {
    axios.delete(`/api/pets_plants/${PetPlant.id}`);
    setShowModal(false);
  };

  return (
    <Modal
      contentClassName={theme === 'dark' && 'dark'}
      backdrop='static'
      fullscreen={true}
      show={showModal}
      onHide={() => handleOnHide()}
      onClick={(e: Event) => {
        e.stopPropagation();
      }}
    >
      <Modal.Header closeButton>
        {add ? (
          <Modal.Title>Add Pet</Modal.Title>
        ) : (
          <Modal.Title>Edit {PetPlant.name}</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <Form>
          {petPlantFields.map(([field, value], i) => {
            const fieldName = String(field);
            return (
              <EditField
                key={'field' + i}
                fieldName={fieldName}
                value={value}
                Pet_Plant={PetPlant}
                user={null}
                add={add}
                newPetId={newPetId}
              />
            );
          })}
          {!add && (
            <Button className={theme === 'dark' && 'bootstrap-modal-button'} variant='danger' onClick={() => handleDelete()}>
              Delete
            </Button>
          )}
          <Button className={theme === 'dark' && 'bootstrap-modal-button'} variant='success' onClick={() => handleOnHide()}>
            Finished
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPetModal;
