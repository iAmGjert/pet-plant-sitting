import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Container, Row, Col, Badge, Tabs, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { format } from 'timeago.js';
import PetPlantCard, { PetPlant } from '../Components/Profile/PetPlantCard';
interface Profile {
  id: number;
  name: string;
  image: string;
  average_rating: number;
  bio: string;
  gallery_id: number;
  createdAt: string;
  location: string;
  sitter_rating: number;
  total_ratings: number;
  total_sitter_ratings: number;
  pet_plants: PetPlant[];
}

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [completeProfile, setCompleteProfile] = useState(0);
  const [profileUser, setProfileUser] = useState<Profile | null>(null);
  const { id } = useParams();
  // get a user based on the id in the url
  // offscreen modal for editing profile
  const getProfile = async () => {
    const user = await axios.get('/api/users/' + id);
    setProfileUser(user.data);
    console.log(user);
  };

  const currUser = useAppSelector((state) => state.userProfile.value);
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (currUser.id && Number(id) == currUser?.id) {
      setEditable(true);
    }
  }, [currUser, id]);
  return (
    <Container>
      <Row className='d-flex justify-content-center text-center' xs={1} md={1}>
        <Col>
          <Image roundedCircle fluid thumbnail src={profileUser?.image} />
        </Col>
        <Col>
          <span>
            <h1 style={{ fontSize: '30px', paddingTop: '10px' }}>
              {profileUser?.name}
              {console.log(currUser)}
            </h1>
            <h5>{profileUser?.location}</h5>
            <h5>{'Rating: ' + profileUser?.average_rating}</h5>
            <h5>Member Since: {format(profileUser?.createdAt)}</h5>
            <h3>
              <Badge pill bg='success'>
                Trusted Sitter
              </Badge>
            </h3>
            <br />
            {editable && <button>Edit</button>}
            <Tabs
              defaultActiveKey='profile'
              id='uncontrolled-tab-example'
              className='mb-3'
              fill
              justify
            >
              {/* when we click tab scroll to that section of the site */}
              <Tab eventKey='home' title='Overview'>
                words
              </Tab>
              <Tab eventKey='profile' title='Reviews'>
                words
              </Tab>
              <Tab eventKey='pets' title='Pets'>
                {profileUser?.pet_plants.map((pet) => {
                  return <PetPlantCard PetPlant={pet} key={pet.id} />;
                })}
              </Tab>
              <Tab eventKey='contact' title='Contact' disabled>
                words
              </Tab>
            </Tabs>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
