import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Modal, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../../Pages/Profile';
import { setUser } from '../../state/features/userProfile/userProfileSlice';
import EditField from './EditField';
import EditPetModal from './EditPetModal';
import { useAppDispatch } from '../../state/hooks';
import { ThemeContext } from '../../App';

type Props = {
  user: Profile;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setProfileUser: (user: Profile) => void;
};

const EditAccountModal = ({
  user,
  showModal,
  setShowModal,
  setProfileUser,
}: Props) => {
  // loop through fields on a user and create a form field for each
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [newPet, setNewPet] = useState(false);
  const [newPetId, setNewPetID] = useState(0);
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [location, setLocation] = useState(user?.location);
  const [image, setImage] = useState(user?.image);
  const [bio, setBio] = useState(user?.bio);
  const [userTheme, setTheme] = useState(user?.theme);
  const [petPlant, setPetPlant] = useState(user?.pet_plants);

  const getUser = async () => {
    const user = await axios.get('/auth/login/success');
    // console.log(user.data.user);
    dispatch(setUser(user.data.user));
    setProfileUser(user.data.user);
  };
  const handleOnHide = async () => {
    await axios.put(`/api/users/${user.id}`, {
      ...user,
      name,
      username,
      location,
      image,
      bio,
      theme: userTheme,
    });
    await getUser();
    setShowModal(false);
    navigate(`/profile/${user.id}`);
  };
  useEffect(() => {
    setName(user?.name);
    setUsername(user?.username);
    setBio(user?.bio);
    setLocation(user?.location);
    setImage(user?.image);
    setTheme(user?.theme);
    setPetPlant(user?.pet_plants);
  }, [user, showModal]);

  return (
    <Modal
      // backdrop='static'
      contentClassName={userTheme === 'dark' && 'dark'}
      show={showModal}
      fullscreen={true}
      onHide={() => handleOnHide()}
    >
      <EditPetModal
        PetPlant={{
          id: null,
          name: 'Enter a name',
          bio: 'Talk about your pet/plant',
          image:
            'https://i.pinimg.com/736x/4a/21/33/4a2133dd4dad968c3218fec61d97db55.jpg',
          owner_id: user?.id,
          is_plant: false,
          breed: 'N/A',
          age: 0,
          gender: '',
          rating: 0,
          tags: [],
          ratings: [],
          species: 'N/A',
          total_ratings: 0,
        }}
        showModal={newPet}
        setShowModal={setNewPet}
        add={true}
        newPetId={newPetId}
      />
      <Modal.Header closeButton className={theme === 'dark' && 'dark'}>
        <Modal.Title>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <EditField
            fieldName={'name'}
            setVal={setName}
            value={name}
            user={user}
            Pet_Plant={null}
            add={false}
            newPetId={null}
          />
          <EditField
            fieldName={'username'}
            setVal={setUsername}
            value={username}
            user={user}
            Pet_Plant={null}
            add={false}
            newPetId={null}
          />
          <EditField
            fieldName={'location'}
            setVal={setLocation}
            value={location}
            user={user}
            Pet_Plant={null}
            add={false}
            newPetId={null}
          />
          <EditField
            fieldName={'image'}
            setVal={setImage}
            value={image}
            user={user}
            Pet_Plant={null}
            add={false}
            newPetId={null}
          />
          <EditField
            fieldName={'bio'}
            setVal={setBio}
            value={bio}
            user={user}
            Pet_Plant={null}
            add={false}
            newPetId={null}
          />
          <EditField
            fieldName={'theme'}
            setVal={setTheme}
            value={userTheme}
            user={user}
            Pet_Plant={null}
            add={false}
            newPetId={null}
          />
          <EditField
            fieldName={'pet_plants'}
            value={petPlant}
            setVal={setPetPlant}
            user={user}
            Pet_Plant={null}
            add={false}
            newPetId={null}
          />

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
                  // console.log(res.data.id);
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
          <span>
            <Button
              variant='danger'
              type='button'
              onClick={() => setShowModal(false)}
              className='m-2'
            >
              Cancel
            </Button>
            <Button
              variant='success'
              type='button'
              onClick={() => handleOnHide()}
              className={theme === 'dark' && 'bootstrap-modal-button'}
            >
              Finished
            </Button>
          </span>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAccountModal;
