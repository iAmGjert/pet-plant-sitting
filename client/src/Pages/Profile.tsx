import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
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
  ProgressBar,
  Toast,
  ToastContainer,
  Navbar,
  Nav,
  CardGroup,
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { format } from 'timeago.js';
import PetPlantCard, { PetPlant } from '../Components/Profile/PetPlantCard';
import EditAccountModal from '../Components/Profile/EditAccountModal';
import Rating from '../Components/Profile/Rating';
import { scroller } from 'react-scroll';
import { profile } from 'console';

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
  username: string;
  theme: string;
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
  const [showToast, setShowToast] = useState(true);
  const [newImgCloud, setNewImgCloud] = useState('');
  const [calcLoc, setCalcLoc] = useState('');
  const [completeProfile, setCompleteProfile] = useState(0);
  const [missingFields, setMissingFields] = useState([]);
  const [profileUser, setProfileUser] = useState<Profile | null>(null);
  const currUser = useAppSelector((state) => state.userProfile.value);
  const navigate = useNavigate();
  const { id } = useParams();
  // const missingFields: string[] = [];
  const checkProgress = () => {
    let total = 0;
    setMissingFields([]);
    if (profileUser) {
      profileUser?.name
        ? total++
        : setMissingFields((prev) => [...prev, 'Name']);
      profileUser?.username
        ? total++
        : setMissingFields((prev) => [...prev, 'Username']);
      profileUser?.location
        ? total++
        : setMissingFields((prev) => [...prev, 'Location']);
      profileUser?.image
        ? total++
        : setMissingFields((prev) => [...prev, 'Image']);
      profileUser?.bio ? total++ : setMissingFields((prev) => [...prev, 'Bio']);
      profileUser?.pet_plants.length > 0
        ? total++
        : setMissingFields((prev) => [...prev, 'Pets and Plants']);
    }
    setCompleteProfile(total);
  };
  // get a user based on the id in the url
  // offscreen modal for editing profile
  // Change tabs to Nav with style tab https://stackoverflow.com/questions/36342220/tabs-in-react-bootstrap-navbar
  // Nav will be sticky top and will scroll with the page
  const getProfile = async () => {
    const user = await axios.get('/api/users/' + id);
    if (user.data === '') {
      navigate('/');
    }
    //console.log(user);
    setProfileUser(user.data);
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
  // const widget = window?.cloudinary.openUploadWidget(
  //   {
  //     cloudName: process.env.CLOUDINARY_NAME,
  //     uploadPreset: process.env.CLOUDINARY_PRESET,
  //   },
  //   (error: Error, result: any) => {
  //     if (result.event === 'success') {
  //       setNewImgCloud(result.info.url);
  //     }
  //   }
  // );
  const showWidget = () => {
    const widget = window?.cloudinary.openUploadWidget(
      {
        cloudName: process.env.CLOUDINARY_NAME,
        uploadPreset: process.env.CLOUDINARY_PRESET,
      },
      (error: Error, result: any) => {
        if (!error && result && result.event === 'success') {
          setNewImgCloud(result.info.url);
        }
      }
    );
  };
  const getLocation = async (location: string) => {
    if (location) {
      const arr = []; //[city, state, zip]
      // const loc = location.split(',');
      // return loc[1].trim() + ', ' + loc[2].trim();
      const loc = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${profileUser?.location}.json?access_token=${process.env.MAPBOX_TOKEN}`
      );
      if (loc.data.features.length === 0) {
        setCalcLoc('No Location');
        return;
      }
      // console.log(loc);
      for (let i = 0; i < loc.data.features[0].context.length; i++) {
        if (loc.data.features[0].context[i].id.includes('place')) {
          arr[0] = loc.data.features[0].context[i].text;
        }
        if (loc.data.features[0].context[i].id.includes('region')) {
          arr[1] = loc.data.features[0].context[i].text;
        }
        if (loc.data.features[0].context[i].id.includes('postcode')) {
          arr[2] = loc.data.features[0].context[i].text;
        }
      }
      setCalcLoc(arr.join(', '));
      // return arr.join(',');
    } else {
      setCalcLoc('No Location');
      // return 'No Location';
    }
  };

  const deleteGallery = (id: number) => {
    axios
      .delete('/api/gallery/entry/' + id)
      .then(() => {
        getProfile();
      })
      .catch((err) => {
        console.log('error', err);
      });
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
    if (id === undefined || id === 'undefined' || id === '') {
      navigate('/');
    }

    if (id) {
      getProfile();
    }
  }, [id]);

  useEffect(() => {
    if (currUser.id && Number(id) == currUser?.id) {
      checkProgress();
      setEditable(true);
    } else {
      setEditable(false);
    }
  }, [currUser, id]);

  useEffect(() => {
    checkProgress();
    getLocation(profileUser?.location);
  }, [profileUser]);
  return (
    <Container fluid>
      {completeProfile !== 6 && editable && (
        <ToastContainer position='middle-center'>
          <Toast
            bg='light'
            show={showToast}
            // delay={5000}
            // autohide
            onClose={() => {
              setShowToast(false);
            }}
          >
            <Toast.Header>
              <img
                src='holder.js/20x20?text=%20'
                className='rounded me-2'
                alt=''
              />
              <strong className='me-auto'>Complete your Profile</strong>
            </Toast.Header>
            <ProgressBar
              min={0}
              max={6}
              now={completeProfile}
              label={`${completeProfile}/6`}
              animated
              striped
              variant='success'
            />
            <Toast.Body>{`Edit your profile and complete the following field(s) : ${missingFields.join(
              ','
            )}`}</Toast.Body>
            <Button
              size='sm'
              variant='success'
              className='bootstrap-button'
              onClick={() => {
                setShowModal(true);
                setShowToast(false);
              }}
            >
              Complete
            </Button>
          </Toast>
        </ToastContainer>
      )}
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
            <h2 style={{ fontSize: '30px', paddingTop: '10px' }}>
              {profileUser?.name}
            </h2>
            <h5>{calcLoc}</h5>
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
              <Button
                variant='secondary'
                size='sm'
                className='bootstrap-button'
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Edit Profile
              </Button>
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
              <Tab eventKey='pets' title='Pets and Plants'>
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
                              <Button
                                variant='danger'
                                onClick={() => {
                                  deleteGallery(entry.id);
                                }}
                              >
                                Delete
                              </Button>
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
                      showWidget();
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
      {/* <Navbar sticky='top' bg='light' variant='light'>
        <Nav fill variant='tabs' defaultActiveKey='/home'>
          <Nav.Item>
            <Nav.Link
              onClick={() =>
                scroller.scrollTo('overview', {
                  smooth: true,
                  offset: -70,
                  duration: 500,
                })
              }
            >
              Overview
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() =>
                scroller.scrollTo('ratings', {
                  smooth: true,
                  offset: -70,
                  duration: 500,
                })
              }
            >
              Reviews
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() =>
                scroller.scrollTo('pets', {
                  smooth: true,
                  offset: -70,
                  duration: 500,
                })
              }
            >
              Pets and Plants
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() =>
                scroller.scrollTo('gallery', {
                  smooth: true,
                  offset: -70,
                  duration: 200,
                })
              }
            >
              Gallery
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar> */}
      {/* <Row>
        <h2 id='overview'>About {profileUser?.name}</h2>
        {!readMore ? (
          <>
            {formatBio(profileUser?.bio) || (
              <h6>This user has not written their bio</h6>
            )}
            <br />
            {formatBio(profileUser?.bio) && (
              <button
                className='button-as-link my-2'
                onClick={() => {
                  setReadMore(!readMore);
                }}
              >
                (Read More)
              </button>
            )}
          </>
        ) : (
          <>{profileUser?.bio}</>
        )}
      </Row> */}
      {/* <Row>
        <h2 id='ratings'> {`Reviews(${profileUser?.ratings.length})`} </h2>
        {profileUser?.ratings.map((rating, i) => {
          return (
            <Rating rating={rating} key={'rating' + i} getStars={getStars} />
          );
        })}
      </Row> */}
      {/* <h2 id='pets' className='text-decoration-underline'>
        {' '}
        My Pets and Plants{' '}
      </h2> */}
      {/* <Row xs={1} md={2} lg={3}>
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
      </Row>
      <h2 id='gallery'> My Gallery </h2>
      <Row xs={2} md={4} lg={8}>
        {profileUser?.gallery?.gallery_entries.length >= 1 &&
          profileUser.gallery.gallery_entries.map((entry: any, i) => {
            return (
              <>
                <Card
                  onClick={() => {
                    setShowGalleryFooter(!showGalleryFooter);
                  }}
                >
                  <Card.Img variant='top' src={entry.url} key={'entry' + i} />
                  {editable && showGalleryFooter && (
                    <Card.Footer>
                      <Button
                        variant='danger'
                        onClick={() => {
                          deleteGallery(entry.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Card.Footer>
                  )}
                </Card>
              </>
            );
          })} */}
      {/* {editable && (
          <Card
            className='text-center'
            onClick={() => {
              // check if this user has a gallery, if it dosent make one. Then do some cloudinary to upload a pic to said gallery. then for each pic in the gallery, make a card with the pic and a delete button.
              showWidget();
            }}
          >
            <Card.Img
              variant='top'
              src='https://static.thenounproject.com/png/3322766-200.png'
            />
            <h1 style={{ fontWeight: 'bold' }}>Add Pictures</h1>
          </Card>
        )}
      </Row> */}
    </Container>
  );
};

export default Profile;
