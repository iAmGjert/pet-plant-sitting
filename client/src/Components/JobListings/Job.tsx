import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
interface jobStuff {
  id: number,
  location: string,
  employer_id: number,
  sitter_id: number | null,
  startDate: Date,
  endDate: Date,
  pet_plant: Array<number>
}
const Job = ({ job }) => {
  const {id, location, pet_plant, employer_id, sitter_id, startDate, endDate}: jobStuff = job;
  const users = useAppSelector((state)=>state.userProfile.users);
  const petPlants = useAppSelector((state)=>state.petPlant.petPlants);
  const handleClick = ()=>{
    console.log(`Clicked more info for job#${id}`);
  }
  return (
    <Container>
      <Card>
        <Card.Body>
          <Row>
            <Col xs sm={1} md={1} lg={1}>
              <Card.Title>
                Job#{id}
              </Card.Title>
            </Col>
            <Col>        
              <Card.Text>
                Employer: {<div>{users[employer_id].name}</div>}
              </Card.Text>
            </Col>
            <Col>        
              <Card.Text>
                Pet/Plants: { pet_plant.map((p, i)=>{ return <div key={`p${i}`}>{petPlants[p - 1].name}</div>; }) }
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
            Job Location: {location}
            </Col>
          </Row>
          <Button onClick={()=>{ handleClick(); }} variant='primary'>More Info</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

Job.propTypes = {};

export default Job;
