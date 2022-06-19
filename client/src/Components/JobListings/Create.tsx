import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import { changeView } from '../../state/features/jobs/jobSlice';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';

const Create = () => {
  const dispatch = useAppDispatch();
  const [submit, setSubmit] = useState(true);
  const handleClick = () => {
    //console.log('Form submitted.');
    dispatch(changeView('list'));
    return;
  };
  
  return (
    <div className='welcome'>
      <h1>Job Creation Form:</h1>
      <Form>
        <Row>
          <Col md>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='email' placeholder='example@email.com'/>
              <Form.Text className='text-muted'>
                    We'll never share your email address, trust us!
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group controlId='formPassword'>
              <Form.Label>Pasword</Form.Label>
              <Form.Control type='password' placeholder='password'/>
            </Form.Group>
          </Col>
        </Row>
        {
          submit ? 
            <Button onClick={()=>{ setSubmit(false); }}>Submit Form</Button> :
            <div>
            Are you sure?
              <Button variant='secondary' onClick={()=>{ setSubmit(true); console.log('Form not submitted.'); }}>No</Button>
              <Button onClick={ ()=>{ handleClick(); }}>Yes</Button>
            </div>
        }
      </Form>
    </div>
  );
};

Create.propTypes = {};

export default Create;
