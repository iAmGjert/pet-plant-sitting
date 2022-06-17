import React, { useState, useRef, useEffect } from 'react';
import { Badge, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export interface PetPlant {
  id: number;
  name: string;
  breed: string;
  owner_id: number;
  is_plant: boolean;
  image: string;
  rating: number;
  tags: string[];
  species: string;
  total_ratings: number;
}

type Props = {
  PetPlant: PetPlant;
};

const PetPlantCard = ({ PetPlant }: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const scrollRef = useRef();
  //make function to get the proper stars for rating
  console.log(PetPlant);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Card
      onClick={() => {
        setShowDetails(!showDetails);
        console.log(scrollRef);
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <Card.Img variant='top' src={PetPlant.image} />
      <Card.Body>
        <Card.Title>{PetPlant.name}</Card.Title>
        {!showDetails && <Card.Text>Click for details</Card.Text>}
      </Card.Body>
      {showDetails && (
        <>
          <Card.Body>
            <Card.Text>
              Description about you pet plant and other cool information that is
              cool and fun all at the same time, believe dat
            </Card.Text>
          </Card.Body>
          <ListGroup className='list-group-flush'>
            <ListGroupItem>Add Age to Pet Plants</ListGroupItem>
            <ListGroupItem>Rating: ⭐⭐⭐⭐⭐({PetPlant.rating})</ListGroupItem>
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
