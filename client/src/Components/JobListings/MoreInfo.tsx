import React, {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form, Modal } from 'react-bootstrap';
import { setJobs } from '../../state/features/jobs/jobSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const MoreInfo = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employer, onHide, location, job } = props;
  const user = useAppSelector(state => state.userProfile.value);
  const [showLog, setShowLog] = useState(false);
  const [obj, setObj] = useState(
    {
      job_id: job.id, 
      user_id: user.id,
    });
  const postApplicant = async (newApplicant: any) => {
    return await axios.post('/api/jobs/applicant/create', newApplicant)
      .then((res: any) => {
        return res;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  };
  const onApply = ()=>{
    if (user.name === '') {
      setShowLog(true);
      return;
    }
    postApplicant(obj);
    getJobs();
      
    onHide();
  };
  const getJobs = async () => {
    const jobs = await axios.get(
      '/api/jobs/all'
    );
    dispatch(setJobs(jobs.data));
  };
  return (

    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Apply for Job
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              {`Employer: ${employer}`}
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
            Job Descripion
            </Col>
            <Row>
              <Col xs={6} md={4}>
                {job.description}
              </Col>
            </Row>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={onApply}>Apply</Button>
      </Modal.Footer>
      {
        showLog ?
          <Alert dismissible onClose={ ()=>{ setShowLog(false); } } variant='warning'>You must {' '}<Alert.Link onClick={()=>{ navigate('/login'); }}>Login</Alert.Link> to apply for a job.</Alert> :
          <div />
      }
      
    </Modal>
  );
};

MoreInfo.propTypes = {};

export default MoreInfo;
