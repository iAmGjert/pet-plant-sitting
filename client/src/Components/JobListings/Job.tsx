import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import MoreInfo from './MoreInfo';
import { setPrompt } from '../../state/features/jobs/jobSlice';
import moment from 'moment';
 
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
    //console.log(job);
    if (user.name === '') {
      dispatch(setPrompt(true));      
    }
    setModalShow(true);
  };
  return (
    <Container>
      <Card className='bootstrap-card'>
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
                Array.isArray(pet_plant) ?
                  <div>
                    Pet/Plants: { pet_plant.map((p, i)=>{ return <div key={`p${i}`}>{petPlants[p - 1]?.name}</div>; }) }
                  </div> :
                  <div />
              }
            </Col>
          </Row>
          <Row>
            Job starts {moment(startDate).fromNow()}.            
          </Row>
          <Button className='bootstrap-button' onClick={handleClick} variant='primary'>More Info</Button>
          <>
            <MoreInfo user={user} show={modalShow} job_id={id} onHide={() => setModalShow(false)} job={job} employer={ users.reduce((employer, users)=>{
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
