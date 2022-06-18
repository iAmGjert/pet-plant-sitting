import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditField from './EditField';
import { PetPlant } from './PetPlantCard';

type Props = {
  PetPlant: PetPlant;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const EditPetModal = ({ PetPlant, showModal, setShowModal }: Props) => {
  const navigate = useNavigate();
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

  return (
    <Modal
      backdrop='static'
      fullscreen={true}
      show={showModal}
      onHide={() => handleOnHide()}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit {PetPlant.name}</Modal.Title>
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
              />
            );
          })}
          <Button variant='success' onClick={() => handleOnHide()}>
            Finished
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPetModal;
