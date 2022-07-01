import React, {useState, useEffect, useContext} from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { Container, Row, Col, Button, Alert, Modal } from 'react-bootstrap';
import { setJobs } from '../../state/features/jobs/jobSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../../App';
import moment from 'moment';
import { deleteApplication } from '../../state/features/jobs/jobSlice';
  



const MoreInfo = (props) => {         
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setShowRevoked, setShowApplied, distance, employer, onHide, job, job_id } = props;
  const user = useAppSelector(state => state.userProfile.value);
  const [showLog, setShowLog] = useState(false);
  const obj = 
    {
      job_id: job_id, 
      user_id: user.id,
      status: 'pending'
    };
  const applicant = job.job_applicants.reduce((res, applicant)=>{
    if (applicant.user_id === user.id) {
      res = true;
    }
    return res;
  }, false);
  const postApplication = async (newApplicant: any) => {
    return await axios.post('/api/jobs/applicant/create', newApplicant)
      .then((res: any) => {
        return res;
      })
      .catch(err => {
        console.error(err);
        return err;
      });
  };

  const revokeApplication = async (application_id: any) => {
    await dispatch(deleteApplication(application_id));
    await getJobs();
  };


  const onApply = async ()=>{
    if (user.name === '') {
      setShowLog(true);
      return;
    }
    if (user.name === employer) {
      console.log('This is your job!');
      return;
    }
    if (applicant) {
      const app_id = job.job_applicants.reduce((res, applicant)=>{
        if (applicant.user_id === user.id) {
          res = applicant.id;
        }
        return res;
      }, 0);
      revokeApplication(app_id);
      setShowRevoked(true);
      return;
    }
    setShowApplied(true);
    await postApplication(obj);
    await getJobs();
    onHide();
  };
  const getJobs = async () => {
    const jobs = await axios.get(
      '/api/jobs/all'
    );
    dispatch(setJobs(jobs.data));
  };
  return (
    
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" contentClassName={theme === 'dark' && 'dark'}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${employer}\'s job listing:`} 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            Job Descripion:
            <Row>
              {job.description}
            </Row>
          </Row>
          <Row>
            From {moment(job.startDate).format('MM/DD')} to {moment(job.endDate).format('MM/DD')}.
          </Row>
          <Row>
            Job length: {moment(job.endDate).diff(moment(job.startDate), 'days')} {moment(job.endDate).diff(moment(job.startDate), 'days') > 1 ? 'days' : 'day'}
          </Row>
          <Row>
            {distance === null ? 'Add a location to your profile to see the distance between you and this job!' : `Distance to job: ${distance} miles`}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className={theme === 'dark' && 'bootstrap-modal-button'} onClick={onHide}>Close</Button>
        <Button className={theme === 'dark' && 'bootstrap-modal-button'} onClick={onApply}>{user.id === job.employer_id ? 'Edit' : applicant ? 'Revoke Application' : 'Apply'}</Button>
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
