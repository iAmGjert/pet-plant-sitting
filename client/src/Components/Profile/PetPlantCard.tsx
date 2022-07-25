import React, { useState, useRef, useEffect, useContext } from 'react';
import { Badge, Card, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import EditPetModal from './EditPetModal';
import { RatingInfo } from '../../Pages/Profile';
import { ThemeContext } from '../../App';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { AiOutlineStar } from '@react-icons/all-files/ai/AiOutlineStar';

export interface PetPlant {
  id: number;
  name: string;
  breed: string;
  owner_id: number;
  is_plant: boolean;
  image: string;
  rating: number;
  tags: string[];
  ratings: RatingInfo[];
  species: string;
  total_ratings: number;
  age: string;
  gender: string;
  bio: string;
}

type Props = {
  PetPlant: PetPlant;
  getStars: (num: number) => [number];
  edit: boolean;
};

const PetPlantCard = ({ PetPlant, getStars, edit }: Props) => {
  const theme = useContext(ThemeContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const scrollRef = useRef();
  //make function to get the proper stars for rating
  // console.log(PetPlant);

  const getRating = () => {
    let sum = 0;
    for (let i = 0; i < PetPlant.ratings.length; i++) {
      sum += PetPlant.ratings[i].value;
    }
    return sum / PetPlant.ratings.length;
  };

  useEffect(() => {
    // scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Col>
      <Card
        className='bootstrap-card'
        // style={{ width: '18rem' }}
        onClick={() => {
          if (edit) {
            setShowModal(!showModal);
          } else {
            setShowDetails(!showDetails);
          }

          // console.log(scrollRef);
          // scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <EditPetModal
          PetPlant={PetPlant}
          showModal={showModal}
          setShowModal={setShowModal}
          add={false}
          newPetId={null}
        />
        <Card.Img
          variant='top'
          src={PetPlant.image}
          style={{ width: 'auto', objectFit: 'cover' }}
          alt='pet/plant picture'
          height='300px'
        />
        <Card.Body className={theme === 'dark' && 'bootstrap-modal-card'}>
          <Card.Title>{PetPlant.name}</Card.Title>
          {edit ? (
            <Card.Text>Click to edit</Card.Text>
          ) : (
            !showDetails && <Card.Text>Click for details</Card.Text>
          )}
        </Card.Body>
        {showDetails && (
          <>
            <Card.Body>
              {getStars(getRating()).map((e) => {
                if (e === 1) {
                  return <AiFillStar color='gold' />;
                } else {
                  return <AiOutlineStar />;
                }
              })}
              ({PetPlant.ratings.length}){<Card.Text>{PetPlant.bio}</Card.Text>}
              {!edit && (
                <div>
                  {getRating() >= 4 && (
                    <Badge pill bg='success'>
                      {PetPlant.gender === 'Male' ? 'Goodest boy' : 'Gal Pal'}
                    </Badge>
                  )}
                </div>
              )}
              {PetPlant.gender && PetPlant.age && (
                <Card.Text>
                  {PetPlant.gender === 'Male'
                    ? `He is a${PetPlant.age === 'Adult' ? 'n' : ''} ${
                        PetPlant.age
                      } ${PetPlant.breed}`
                    : `She is  a${PetPlant.age === 'Adult' ? 'n' : ''} ${
                        PetPlant.age
                      } ${PetPlant.breed}`}
                </Card.Text>
              )}
              {PetPlant.species && <Card.Text>{PetPlant.species}</Card.Text>}
            </Card.Body>
            {/* <ListGroup className='list-group-flush'>
              {!edit && (
                <ListGroupItem>
                  {getStars(getRating())}({PetPlant.ratings.length})
                  {getRating() >= 4 && (
                    <Badge pill bg='success'>
                      {PetPlant.gender === 'Male' ? 'Goodest boy' : 'Gal Pal'}
                    </Badge>
                  )}
                </ListGroupItem>
              )}
              {PetPlant.gender && PetPlant.age && (
                <ListGroupItem>
                  {PetPlant.gender === 'Male'
                    ? `He is a ${PetPlant.age} ${PetPlant.breed}`
                    : `She is  a(n) ${PetPlant.breed} ${PetPlant.age}`}
                </ListGroupItem>
              )}
              {PetPlant.breed && (
                <ListGroupItem>{PetPlant.breed}</ListGroupItem>
              )}
            </ListGroup> */}
            <Card.Body>
              {PetPlant.tags.map((tag, i) => {
                return (
                  <Badge
                    className='bootstrap-badge'
                    ref={scrollRef} pill bg={theme === 'dark' ? '' : 'info'} key={i + PetPlant.id}>
                    {tag.toUpperCase()}
                  </Badge>
                );
              })}
            </Card.Body>
          </>
        )}
      </Card>
    </Col>
  );
};

export default PetPlantCard;
