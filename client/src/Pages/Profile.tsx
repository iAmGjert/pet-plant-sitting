import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Container,
  Row,
  Col,
  Badge,
  Tabs,
  Tab,
  Card,
  Button,
} from 'react-bootstrap';
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
    id: number;
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
  gallery: {
    id: number;
    user_id: number;
    gallery_entries: [];
  };
}

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [showGalleryFooter, setShowGalleryFooter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newImgCloud, setNewImgCloud] = useState('');

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
    // console.log(Math.floor(sum / profileUser?.ratings.length));
    return Math.floor(sum / profileUser?.ratings.length);
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
  const widget = window?.cloudinary.createUploadWidget(
    {
      cloudName: process.env.CLOUDINARY_NAME,
      uploadPreset: process.env.CLOUDINARY_PRESET,
    },
    (error: Error, result: any) => {
      if (result.event === 'success') {
        setNewImgCloud(result.info.url);
      }
    }
  );
  const showWidget = () => {
    widget.open();
  };
  useEffect(() => {
    if (newImgCloud) {
      if (!profileUser.gallery?.id) {
        axios.post(`/api/gallery/${currUser.id}`).then((results: any) => {
          axios
            .post(`/api/gallery/entry/${results.data[0].id}`, {
              url: newImgCloud,
              gallery_id: results.data[0].id,
            })
            .then(() => {
              getProfile();
            });
        });
      } else {
        axios
          .post(`/api/gallery/entry/${profileUser.gallery.id}`, {
            url: newImgCloud,
            gallery_id: profileUser.gallery.id,
          })
          .then(() => {
            getProfile();
          });
      }
    }
  }, [newImgCloud]);

  useEffect(() => {
    if (id) {
      getProfile();
    }
  }, [id]);

  useEffect(() => {
    if (currUser.id && Number(id) == currUser?.id) {
      setEditable(true);
    } else {
      setEditable(false);
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
              {getRating() >= 2 && (
                <Badge pill bg='success'>
                  {/* if sitter has repeated customers */}
                  Trusted Sitter
                </Badge>
              )}
              {profileUser?.ratings.length > 1 &&
                profileUser?.ratings.length < 5 && (
                  <Badge pill bg='info'>
                    {/* if sitter < 2 jobs completed > */}
                    New Sitter
                  </Badge>
                )}
              {getRating() === 5 && (
                <Badge pill bg='primary'>
                  {/* 5 star rating */}
                  Top Rated!
                </Badge>
              )}
              {profileUser?.ratings.length >= 5 && (
                <Badge pill bg='info'>
                  {/* 5 jobs completed */}
                  Experienced Sitter
                </Badge>
              )}
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
              <Tab eventKey='gallery' title='Gallery'>
                {/* for each gallery entry create a card */}
                {profileUser?.gallery?.gallery_entries.length >= 1 &&
                  profileUser.gallery.gallery_entries.map((entry: any, i) => {
                    return (
                      <>
                        <Card
                          onClick={() => {
                            setShowGalleryFooter(!showGalleryFooter);
                          }}
                        >
                          <Card.Img
                            variant='top'
                            src={entry.url}
                            key={'entry' + i}
                          />
                          {editable && showGalleryFooter && (
                            <Card.Footer>
                              <Button variant='danger'>Delete</Button>
                            </Card.Footer>
                          )}
                        </Card>
                      </>
                    );
                  })}
                {editable && (
                  <Card
                    className='text-center'
                    onClick={() => {
                      // check if this user has a gallery, if it dosent make one. Then do some cloudinary to upload a pic to said gallery. then for each pic in the gallery, make a card with the pic and a delete button.
                      axios.post(`/api/gallery/${currUser.id}`).then(() => {
                        showWidget();
                      });
                    }}
                  >
                    <Card.Img
                      variant='top'
                      src='https://static.thenounproject.com/png/3322766-200.png'
                    />
                    <h1 style={{ fontWeight: 'bold' }}>Add Pictures</h1>
                  </Card>
                )}
              </Tab>
            </Tabs>
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
