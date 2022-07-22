import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Google from '../Components/LoginForm/GoogleButton';
import LoginForm from '../Components/LoginForm/LoginForm';

// type Props = {};

const Login = () => {
  return (
    <Container fluid className='login-container' >
      <Row className='align-items-center' xs={1} md={1}>
        <Col xs={{ order: 'last' }}>
          <Google />
        </Col>
        <Col xs={{ order: 1 }} md={{ order: 1 }}>
          <LoginForm />
        </Col>
        <Col xs={{ order: 2 }} md={{ order: 2 }}>
          <div className='seperator'>

            <div className='space'></div>or<div className='space'></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
