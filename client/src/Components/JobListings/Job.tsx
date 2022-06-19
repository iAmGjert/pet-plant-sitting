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
  const [users, setUsers] = useState(useAppSelector((state)=>state.userProfile.users));
  const [petPlants, setPetPlants] = useState(useAppSelector((state)=>state.petPlant.petPlants));
  const {id, location, pet_plant, employer_id, sitter_id, startDate, endDate}: jobStuff = job;
  const handleClick = ()=>{
    console.log(`Clicked more info for job#${id}`);
  };
  const [load, setLoad] = useState(false);
  useEffect(()=>{
    setLoad(true);
  }, []);
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
              {
                users[employer_id] ? 
                  <div>
                    Employer: {<div>{users[employer_id].name}</div>}
                  </div> :
                  <div />
              }
            </Col>
            <Col>        
              {
                petPlants[pet_plant[0]] ?
                  <div>
                    Pet/Plants: { pet_plant.map((p, i)=>{ return <div key={`p${i}`}>{petPlants[p - 1].name}</div>; }) }
                  </div> :
                  <div />
              }
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
