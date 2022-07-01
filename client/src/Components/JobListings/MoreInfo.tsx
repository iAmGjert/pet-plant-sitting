import React, {useState, useEffect, useContext} from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { Container, Row, Col, Button, Alert, Modal, Card } from 'react-bootstrap';
import { setJobs, deleteApplication } from '../../state/features/jobs/jobSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../../App';
import moment from 'moment';
  



const MoreInfo = (props) => {         
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setshowrevoked, setshowapplied, distance, employer, onHide, job, job_id } = props;
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
      onHide();
      return;
    }
    if (user.name === employer) {
      console.log('This is your job!');
      onHide();
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
      setshowrevoked(true);
      onHide();
      return;
    }
    setshowapplied(true);
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
          {
            employer !== user.name ?
              <Row>
                {distance === null ? 'Add a location to your profile to see the distance between you and this job!' : `Distance to job: ${distance} miles`}
              </Row> :
              <Row>
                {
                  job.job_applicants.length === 0 ? 
                    'No job applicants, yet.' :
                    <>
                      Applicants: 
                      {
                        job.job_applicants.map((applicant, idx)=>{
                          return (
                            <Card key={`applicant${idx}`}>
                              <Row>
                                <Card.Title>{applicant.user.name}</Card.Title>
                              </Row>
                              <Row>
                                <Col>
                                  <Button variant='primary' onClick={()=>{ navigate(`/profile/${applicant.user_id}`); }}>Profile</Button>
                                </Col>
                                <Col>
                                  <Button variant='warning' onClick={()=>{ navigate('/chat'); }}>Chat</Button>
                                </Col>
                              </Row>
                              
                              
                            </Card>
                          );
                        })
                      }
                    </>
                }
              </Row>

          }          
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
