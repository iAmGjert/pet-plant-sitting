import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import EditField from './EditField';
import { PetPlant } from './PetPlantCard';

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
  const [name, setName] = useState(PetPlant?.name);
  const [age, setAge] = useState(PetPlant?.age);
  const [breed, setBreed] = useState(PetPlant?.breed);
  const [bio, setBio] = useState(PetPlant?.bio);
  const [image, setImage] = useState(PetPlant?.image);
  const [species, setSpecies] = useState(PetPlant?.species);
  const [tags, setTags] = useState(PetPlant?.tags);
  const [gender, setGender] = useState(PetPlant?.gender);
  const [isPlant, setIsPlant] = useState(PetPlant?.is_plant);
  const handleOnHide = async () => {
    if (add) {
      await axios.put(`/api/pets_plants/${newPetId}`, {
        ...PetPlant,
        id: newPetId,
        name,
        age,
        breed,
        image,
        bio,
        gender,
        tags,
        is_plant: isPlant,
      });
      setShowModal(false);
    } else {
      await axios.put(`/api/pets_plants/${PetPlant.id}`, {
        ...PetPlant,
        name,
        age,
        breed,
        image,
        bio,
        gender,
        tags,
        is_plant: isPlant,
      });
      setShowModal(false);
    }
    // setShowModal(false);
    // navigate(`/profile/${PetPlant.owner_id}`);
  };

  const handleDelete = () => {
    axios.delete(`/api/pets_plants/${PetPlant.id}`);
    setShowModal(false);
  };

  return (
    <Modal
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
          <EditField
            fieldName={'is_plant'}
            value={isPlant}
            setVal={setIsPlant}
            user={null}
            Pet_Plant={PetPlant}
            add={add}
            newPetId={newPetId}
          />
          <EditField
            fieldName={'name'}
            value={name}
            setVal={setName}
            user={null}
            Pet_Plant={PetPlant}
            add={add}
            newPetId={newPetId}
          />
          <EditField
            fieldName={'image'}
            value={image}
            setVal={setImage}
            user={null}
            Pet_Plant={PetPlant}
            add={add}
            newPetId={newPetId}
          />
          <EditField
            fieldName={'age'}
            value={age}
            setVal={setAge}
            user={null}
            Pet_Plant={PetPlant}
            add={add}
            newPetId={newPetId}
          />
          <EditField
            fieldName={'bio'}
            value={bio}
            setVal={setBio}
            user={null}
            Pet_Plant={PetPlant}
            add={add}
            newPetId={newPetId}
          />
          {isPlant && (
            <EditField
              fieldName={'tags'}
              value={tags}
              setVal={setTags}
              user={null}
              Pet_Plant={PetPlant}
              add={add}
              newPetId={newPetId}
            />
          )}
          {!isPlant && (
            <EditField
              fieldName={'tags'}
              value={tags}
              setVal={setTags}
              user={null}
              Pet_Plant={PetPlant}
              add={add}
              newPetId={newPetId}
            />
          )}
          <EditField
            fieldName={'gender'}
            value={gender}
            setVal={setGender}
            user={null}
            Pet_Plant={PetPlant}
            add={add}
            newPetId={newPetId}
          />
          <EditField
            fieldName={'breed'}
            value={breed}
            setVal={setBreed}
            user={null}
            Pet_Plant={PetPlant}
            add={add}
            newPetId={newPetId}
          />
          <EditField
            fieldName={'species'}
            value={species}
            setVal={setSpecies}
            user={null}
            Pet_Plant={PetPlant}
            add={add}
            newPetId={newPetId}
          />

          {!add && (
            <Button variant='danger' onClick={() => handleDelete()}>
              Delete
            </Button>
          )}
          <Button variant='success' onClick={() => handleOnHide()}>
            Finished
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPetModal;
