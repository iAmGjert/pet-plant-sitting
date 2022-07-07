import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { changeView, setJobs } from '../../state/features/jobs/jobSlice';
import {
  Row,
  Col,
  Button,
  Form,
  ToggleButton,
  ButtonGroup,
  Alert,
} from 'react-bootstrap';
import LoginPrompt from './LoginPrompt';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Edit = ({ job }): JSX.Element => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userProfile.value);
  const petPlants = user.pet_plants;
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState(job.startDate);
  const [endDate, setEndDate] = useState(job.endDate);
  const [description, setDescription] = useState('');
  const [feed, setFeed] = useState(
    petPlants.reduce((arr, pet) => {
      if (job.pet_plant.includes(pet.id)) {
        arr.push(true);
      } else {
        arr.push(false);
      }
      return arr;
    }, [])
  );
  const [disabled, setDisabled] = useState(true);
  const getJobs = async () => {
    const jobs = await axios.get('/api/jobs/all');
    dispatch(setJobs(jobs.data));
  };
  
  const editJob = async (editedJob: any) => {
    return await axios
      .patch(`/api/jobs/edit/${job.id}`, editedJob)
      .then((res: any) => {
        return res;
      })
      .then((editedJob) => {
        editedJob.data.job_pets_plants.forEach((petPlant: any)=> {
          axios
            .delete(`/api/jobs/jobPetsPlants/delete/${petPlant.id}`)
            .then((res: any)=>{
              return res;
            });
        });
        editedJob.data.pet_plant.forEach((pet) => {
          axios.post('/api/jobs/jobPetsPlants/create', {
            job_id: job.id,
            pet_plant_id: pet,
          });
        });

        // newJob.data.pet_plant.forEach((pet: any) => {
        //   console.log(pet);
          
        //   // axios.post('/api/jobs/jobPetsPlants/create', {
        //   //   job_id: newJob.data.id,
        //   //   pet_plant_id: pet,
        //   // });
        // });
      })
      .then(() => {
        getJobs();
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  };
  
  useEffect(()=>{
    //console.log(job.pet_plant);
  }, []);

  const handleChangeStartDate = (e: Event) => {
    setStartDate(e.target.value);
  };
  const handleChangeEndDate = (e: Event) => {
    setEndDate(e.target.value);
  };
  const handleChangeDescription = (e: Event) => {
    setDescription(e.target.value);
  };

  const petFeedButton = (e, index) => {
    const newFeed = feed.reduce((a, e) => {
      a.push(e);
      return a;
    }, []);
    newFeed[index] = !newFeed[index];
    setFeed(newFeed);
  };
  const handleSubmit = () => {
    const jobPetsPlants = petPlants.filter((pet, i) => {
      if (feed[i] === true) {
        return true;
      }
      return false;
    }).reduce((petIds, pet)=>{
      petIds.push(pet.id);
      return petIds;
    }, []);
    //console.log(job);

    const obj = {
      location: job.location,
      employer_id: user.id,
      pet_plant: jobPetsPlants,
      sitter_id: null,
      startDate: startDate,
      endDate: endDate,
      isCompleted: false,
      description: description,
      job_pets_plants: job.job_pets_plants,
    };
    editJob(obj);

    dispatch(changeView('list'));
    return;
  };
  useEffect(() => {
    feed.some((ele) => {
      return ele === true;
    })
      ? setDisabled(false)
      : setDisabled(true);
  }, [feed]);
  return user.name !== '' ? (
    user.pet_plants.length > 0 ? (
      <Form>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput2">
          <Form.Label>
            Job Location: <div>{job.location}</div>
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="createEventForm.ControlInput1">
          <Form.Label>Pets/Plants</Form.Label>
          <br />
          <ButtonGroup className="mb-2">
            {user.pet_plants.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`checkbox-${idx}`}
                type="checkbox"
                variant={feed[idx] ? 'outline-success' : 'outline-danger'}
                name="radio"
                value={radio.name}
                checked={feed[idx]}
                onChange={(e) => {
                  petFeedButton(e, idx);
                }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="createEventForm.ControlTextarea1"
        >
          <Form.Label>Description</Form.Label>
          <Form.Control
            className="bootstrap-textbox"
            as="textarea"
            placeholder={job.description}
            rows={3}
            onChange={(e) => {
              handleChangeDescription(e);
            }}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="createEventForm.ControlInput3"
            >
              <Form.Label>Start Date:</Form.Label>
              <Form.Control
                className="bootstrap-textbox"
                type="date"
                value={startDate}
                onChange={(e) => {
                  handleChangeStartDate(e);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="createEventForm.ControlInput3"
            >
              <Form.Label>End Date:</Form.Label>
              <Form.Control
                className="bootstrap-textbox"
                type="date"
                value={endDate}
                onChange={(e) => {
                  handleChangeEndDate(e);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          disabled={disabled}
          className="bootstrap-button"
          variant="primary"
          type="button"
          onClick={handleSubmit}
        >
          Submit Your Changes
        </Button>
      </Form>
    ) : (
      <Alert variant="warning">
        Add a pet or plant to{' '}
        <Alert.Link
          onClick={() => {
            navigate('/profile/' + user.id);
          }}
        >
          your profile
        </Alert.Link>{' '}
        first!
      </Alert>
    )
  ) : (
    <LoginPrompt />
  );
};

Edit.propTypes = {};

export default Edit;
