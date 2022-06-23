import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { changeView, setJobs } from '../../state/features/jobs/jobSlice';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, ToggleButton, ButtonGroup, ToggleButtonGroup } from 'react-bootstrap';
import LoginPrompt from './LoginPrompt';
import moment from 'moment';
import axios from 'axios';


const Create = () => {
  const user = useAppSelector(state => state.userProfile.value);
  const myPets = useAppSelector(state => state.petPlant.petPlants.filter(pet=>pet.owner_id === user.id));
  const petPlants = useAppSelector(state => state.petPlant.petPlants).reduce( (ans, pet, ind)=>{
    if (pet.owner_id === user.id) {
      ans.push(ind + 1);
    }
    return ans;
  }, []);
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState(moment().add(1, 'days').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().add(2, 'days').format('YYYY-MM-DD'));
  const [description, setDescription] = useState('');
  const [feed, setFeed] = useState(myPets.reduce(arr=>{ arr.push(false); return arr; }, []));
  const getJobs = async () => {
    const jobs = await axios.get(
      '/api/jobs/all'
    );
    dispatch(setJobs(jobs.data));
  };
  const postJob = async (newJob: any) => {
    return await axios.post('/api/jobs/create', newJob)
      .then((res: any) => {
        return res;
      })
      .then((newJob)=>{
        newJob.data.pet_plant.forEach((pet)=>{
          axios.post('/api/jobs/jobPetsPlants/create', {
            job_id: newJob.data.id,
            pet_plant_id: pet
          });
        });
      })
      .then(()=>{
        getJobs();
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  };
  
  const handleChangeStartDate = (e: Event) => {
    setStartDate(e.target.value);
  };
  const handleChangeEndDate = (e: Event) => {
    setEndDate(e.target.value);
  };
  const handleChangeDescription = (e: Event) => {
    setDescription(e.target.value);
  };
  
  const petFeedButton = (e, index)=>{
    const newFeed = feed.reduce((a, e)=>{ a.push(e); return a; }, []);
    newFeed[index] = !newFeed[index];
    setFeed(newFeed);
  };
  const handleSubmit = () => {
    const obj = {
      location: user.location, 
      employer_id: user.id, 
      pet_plant: petPlants,
      startDate: startDate,
      endDate: endDate,
      isCompleted: false,
      description: description
    };
    postJob(obj);

    dispatch(changeView('list'));
    return;
  };
  return user.name !== '' ?
    (
      <Form>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput2">
          <Form.Label>Job Location: <div>{user.location}</div></Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput1">
          <Form.Label>Pets/Plants</Form.Label>
          <br />
          <ButtonGroup className="mb-2">
            {myPets.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`checkbox-${idx}`}
                type="checkbox"
                variant={feed[idx] ? 'outline-success' : 'outline-danger'}
                name="radio"
                value={radio.name}
                checked={feed[idx]}
                onChange={(e) => { petFeedButton(e, idx); }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="createEventForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" placeholder={'Describe the job in one or two sentenses.'} rows={3} onChange={(e)=>{ handleChangeDescription(e); }}/>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="createEventForm.ControlInput3">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control type="date" value={startDate}
                onChange={(e)=>{ handleChangeStartDate(e); }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="createEventForm.ControlInput3">
              <Form.Label>End Date:</Form.Label>
              <Form.Control type="date" value={endDate}
                onChange={(e)=>{ handleChangeEndDate(e); }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="button" onClick={handleSubmit}>
      Submit
        </Button>
      </Form> 
    ) : <LoginPrompt/>;
};

Create.propTypes = {};

export default Create;
