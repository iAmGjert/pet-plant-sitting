import React, { useState, useRef, useEffect } from 'react';
import { Badge, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
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
    <Card
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
              </ListGroupItem>
            )}
            {PetPlant.gender && (
              <ListGroupItem>
                {PetPlant.gender === 'Male'
                  ? `He is ${PetPlant.age} years old`
                  : `She is ${PetPlant.age} years old`}
              </ListGroupItem>
            )}
            {PetPlant.breed && <ListGroupItem>{PetPlant.breed}</ListGroupItem>}
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
  );
};

export default PetPlantCard;
