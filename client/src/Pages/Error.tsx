import React from 'react';
import {useNavigate} from 'react-router-dom'; 
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
const Error = () => {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <Card style={{ width: '95%', margin: 'auto' }} className='bootstrap-card'>
        <h4>
          Something went wrong. 😿
        </h4>
        <h5>Don&apos;t worry, our IT department is working on it now</h5>
        <img src="https://media.istockphoto.com/photos/dog-using-computer-picture-id453035943?k=20&m=453035943&s=612x612&w=0&h=_JUFM209bhvyXiTNWk5swTFp_lYjQCW4DhUUBZMKZBs=" className="dog-fixing-cpu" alt="dog" />
        <Button onClick={() => navigate('/')}>Go back to the home page</Button>
       
      </Card>
    </Container>
  );
};

export default Error;
