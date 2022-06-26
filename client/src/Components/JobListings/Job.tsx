import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import MoreInfo from './MoreInfo';
import { setPrompt } from '../../state/features/jobs/jobSlice';
 
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
  const [modalShow, setModalShow] = useState(false);
  const users = useAppSelector((state)=>state.userProfile.users);
  const user = useAppSelector((state)=>state.userProfile.value);
  const petPlants = useAppSelector((state)=>state.petPlant.petPlants);
  const { id, location, pet_plant, employer_id, sitter_id, startDate, endDate}: jobStuff = job;
  const dispatch = useAppDispatch();
  const handleClick = ()=>{
    
    if (user.name === '') {
      dispatch(setPrompt(true));      
    }
    setModalShow(true);
  };
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
                <div>
                  Employer: {<div>{ users.reduce((employer, users)=>{
                    if (users.id === employer_id) {
                      employer = users.name;
                    }
                    return employer;
                  }, '') }</div>}
                </div>
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
          <Button onClick={handleClick} variant='primary'>More Info</Button>
          <>
            <MoreInfo user={user} show={modalShow} onHide={() => setModalShow(false)} job={job} employer={ users.reduce((employer, users)=>{
              if (users.id === employer_id) {
                employer = users.name;
              }
              return employer;
            }, '') } />
          </>
        </Card.Body>
      </Card>
    </Container>
  );
};

Job.propTypes = {};

export default Job;
