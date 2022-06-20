import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Container, Row, Col, Badge, Tabs, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { format } from 'timeago.js';
import PetPlantCard, { PetPlant } from '../Components/Profile/PetPlantCard';
import EditAccountModal from '../Components/Profile/EditAccountModal';
import Rating from '../Components/Profile/Rating';

export interface RatingInfo {
  id: number;
  text: string | null;
  user_id: number | null;
  petplant_id: number | null;
  value: number;
  submitter_id: number;
  createdAt: string;
  updatedAt: string;
  submitter: {
    name: string;
    image: string;
  };
}

export interface Profile {
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
  ratings: RatingInfo[];
}

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [completeProfile, setCompleteProfile] = useState(0);
  const [profileUser, setProfileUser] = useState<Profile | null>(null);
  const currUser = useAppSelector((state) => state.userProfile.value);

  const { id } = useParams();
  // get a user based on the id in the url
  // offscreen modal for editing profile
  // Change tabs to Nav with style tab https://stackoverflow.com/questions/36342220/tabs-in-react-bootstrap-navbar
  // Nav will be sticky top and will scroll with the page
  const getProfile = async () => {
    const user = await axios.get('/api/users/' + id);
    setProfileUser(user.data);
    // console.log(user.data);
  };
  const getRating = () => {
    let sum = 0;
    for (let i = 0; i < profileUser?.ratings.length; i++) {
      sum += profileUser?.ratings[i].value;
    }
    return sum / profileUser?.ratings.length;
  };

  const formatBio = (bio: string) => {
    if (bio?.length > 100) {
      return bio.substring(0, 200) + '...';
    } else {
      return bio;
    }
  };

  const getStars = (rating: number) => {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '⭐';
    }
    while (stars.length < 5) {
      stars += '☆';
    }
    return stars;
  };

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
      <EditAccountModal
        user={profileUser}
        showModal={showModal}
        setShowModal={setShowModal}
        setProfileUser={setProfileUser}
      />
      <Row className='d-flex justify-content-center text-center' xs={1} md={1}>
        <Col>
          <Image roundedCircle fluid thumbnail src={profileUser?.image} />
        </Col>
        <Col>
          <span>
            <h1 style={{ fontSize: '30px', paddingTop: '10px' }}>
              <>
                {profileUser?.name}
                {console.log(currUser)}
              </>
            </h1>
            <h5>{profileUser?.location}</h5>
            <h5>
              {getStars(getRating())}({profileUser?.ratings.length})
            </h5>
            <h5>Member Since: {format(profileUser?.createdAt)}</h5>
            <h3>
              <Badge pill bg='success'>
                Trusted Sitter
              </Badge>
            </h3>
            <br />
            {editable && (
              <button
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Edit
              </button>
            )}
            <Tabs
              defaultActiveKey='overview'
              id='uncontrolled-tab-example'
              className='mb-3 '
              fill
              justify
              onSelect={() => {
                if (readMore) {
                  setReadMore(!readMore);
                }
              }}
            >
              {/* when we click tab scroll to that section of the site */}
              <Tab
                eventKey='overview'
                title='Overview'
                style={{ textAlign: 'left' }}
              >
                {!readMore ? (
                  <>
                    {formatBio(profileUser?.bio)}
                    <br />
                    <button
                      className='button-as-link my-2'
                      onClick={() => {
                        setReadMore(!readMore);
                      }}
                    >
                      (Read More)
                    </button>
                  </>
                ) : (
                  <>{profileUser?.bio}</>
                )}
              </Tab>
              <Tab eventKey='profile' title='Reviews'>
                {profileUser?.ratings.map((rating, i) => {
                  return (
                    <Rating
                      rating={rating}
                      key={'rating' + i}
                      getStars={getStars}
                    />
                  );
                })}
              </Tab>
              <Tab eventKey='pets' title='Pets'>
                {profileUser?.pet_plants.map((pet) => {
                  return (
                    <PetPlantCard
                      PetPlant={pet}
                      key={pet.id}
                      getStars={getStars}
                      edit={null}
                    />
                  );
                })}
              </Tab>
            </Tabs>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
