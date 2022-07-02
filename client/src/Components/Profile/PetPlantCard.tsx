import React, { useState, useRef, useEffect } from 'react';
import { Badge, Card, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import EditPetModal from './EditPetModal';
import { RatingInfo } from '../../Pages/Profile';

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
  age: number;
  gender: string;
  bio: string;
}

type Props = {
  PetPlant: PetPlant;
  getStars: (num: number) => string;
  edit: boolean;
};

const PetPlantCard = ({ PetPlant, getStars, edit }: Props) => {
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
        <Card.Img variant='top' src={PetPlant.image} />
        <Card.Body>
          <Card.Title>{PetPlant.name}</Card.Title>
          {edit ? (
            <Card.Text>Click to edit</Card.Text>
          ) : (
            !showDetails && <Card.Text>Click for details</Card.Text>
          )}
        </Card.Body>
        {showDetails && (
          <>
            <Card.Body>{<Card.Text>{PetPlant.bio}</Card.Text>}</Card.Body>
            <ListGroup className='list-group-flush'>
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
            </ListGroup>
            <Card.Body>
              {PetPlant.tags.map((tag, i) => {
                return (
                  <Badge ref={scrollRef} pill bg='info' key={i + PetPlant.id}>
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
