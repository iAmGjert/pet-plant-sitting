import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import GoogleButton from '../Components/LoginForm/GoogleButton';
import LoginForm from '../Components/LoginForm/LoginForm';

// type Props = {};

const Login = () => {
  return (
    <Container fluid className='vh-100 '>
      <Row className='align-items-center' xs={1} md={1}>
        <Col xs={{ order: 'last' }}>
          <GoogleButton />
        </Col>
        <Col xs={{ order: 1 }} md={{ order: 1 }}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
