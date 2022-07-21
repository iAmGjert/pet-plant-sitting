import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Card, Container, Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../state/hooks';

const Error = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userProfile.value);
  console.log(user);
  return (
    <Container fluid>
      <Card style={{ width: '95%', margin: 'auto' }} className='bootstrap-card'>
        <h4>
          Something went wrong. 😿
        </h4>
        <h5>Don&apos;t worry, our IT department is working on it now</h5>
        <img src={require('../../Public/img/doxen-it.jpg')} className="dog-fixing-cpu" alt="dog" />
        <Button onClick={() => user.name ? navigate('/landingPage') : navigate('/')}>Go back to the home page</Button>
       
      </Card>
    </Container>
  );
};

export default Error;
