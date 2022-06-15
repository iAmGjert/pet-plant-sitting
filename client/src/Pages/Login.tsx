import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import GoogleButton from '../Components/LoginForm/GoogleButton';
import LoginForm from '../Components/LoginForm/LoginForm';

// type Props = {};

const Login = () => {
  return (
    <Container className='vh-100 '>
      <Row className='align-items-center'>
        <Col>
          <GoogleButton />
        </Col>
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
