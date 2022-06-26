import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const login = () => {
    axios.post('/auth/local/login', {
      username: email,
      password,
    }, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };

  const navigateRegister = () => {
    navigate('/register');
  };

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' 
          onChange={(e) => setEmail(e.target.value)} required/>
        <Form.Text className='text-muted'>
          Well never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' 
          onChange={(e) => setPassword(e.target.value)} required/>
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicCheckbox'>
      </Form.Group>
      <Button variant='primary' href='/loading' onClick={login}>
        Submit
      </Button>
      <Button variant='primary' onClick={navigateRegister}>
        Sign Up
      </Button>
    </Form>
  );
};

export default LoginForm;
