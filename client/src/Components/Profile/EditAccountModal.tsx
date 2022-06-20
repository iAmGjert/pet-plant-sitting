import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../../Pages/Profile';
import { setUser } from '../../state/features/userProfile/userProfileSlice';
import EditField from './EditField';
import EditPetModal from './EditPetModal';
import { useAppDispatch, useAppSelector } from '../../state/hooks';

type Props = {
  user: Profile;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setProfileUser: (showModal: boolean) => void;
};

const EditAccountModal = ({ user, showModal, setShowModal, setProfileUser }: Props) => {
  // loop through fields on a user and create a form field for each
  const [newPet, setNewPet] = useState(false);
  const [newPetId, setNewPetID] = useState(0);
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
  const dispatch = useAppDispatch();
  const getUser = async () => {
    const user = await axios.get(
      '/auth/login/success'
    );
    dispatch(setUser(user.data.user));
    // console.log(user, 'LOGIN USER/userProfile state is set');
    setProfileUser(user.data.user);
  };
  const handleOnHide = () => {
    setShowModal(false);
    getUser();
    navigate(`/profile/${user.id}`);
  };

  return (
    <Modal
      // backdrop='static'
      show={showModal}
      fullscreen={true}
      onHide={() => handleOnHide()}
    >
      <EditPetModal
        PetPlant={{
          id: null,
          name: '',
          bio: '',
          image: '',
          owner_id: user?.id,
          is_plant: false,
          breed: '',
          age: 0,
          gender: '',
          rating: 0,
          tags: [],
          ratings: [],
          species: '',
          total_ratings: 0,
        }}
        showModal={newPet}
        setShowModal={setNewPet}
        add={true}
        newPetId={newPetId}
      />
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
                add={false}
                newPetId={null}
              />
            );
          })}
          <Card
            className='text-center'
            onClick={() => {
              // create a new pet in the database
              axios
                .post('/api/pets_plants/create', {
                  name: '',
                  owner_id: user.id,
                  image:
                    'https://i.pinimg.com/736x/4a/21/33/4a2133dd4dad968c3218fec61d97db55.jpg',
                  breed: 'N/A',
                  species: 'N/A',
                  age: 0,
                  bio: 'No bio yet',
                  is_plant: false,
                  tags: [],
                  rating: 0,
                  total_ratings: 0,
                })
                .then((res) => {
                  console.log(res.data.id);
                  setNewPetID(res.data.id);
                });
              setNewPet(true);
            }}
          >
            <Card.Img
              variant='top'
              src='https://t3.ftcdn.net/jpg/02/36/83/48/360_F_236834856_k64hP3apLaj1u62rSTSAKkhVd9TuuMLV.jpg'
            />
            <h1 style={{ fontWeight: 'bold' }}>Add Pets</h1>
          </Card>

          <Button
            variant='success'
            type='button'
            onClick={() => handleOnHide()}
            className='mt-3 '
          >
            Finished
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAccountModal;
