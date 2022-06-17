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
      {
        submit ? 
          <Button onClick={()=>{ setSubmit(false); }}>Submit Form</Button> :
          <div>
            Are you sure?
            <Button onClick={()=>{ handleClick(); }}>Yes</Button><Button onClick={ ()=>{ setSubmit(true); console.log('Form not submitted.'); } }>No</Button></div>

      }
    </div>
  );
};

Create.propTypes = {};

export default Create;
