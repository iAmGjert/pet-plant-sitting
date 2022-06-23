import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
  const [name , setName] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    axios.post('/auth/local/login', {
      username: email,
      password,
    }, {
      withCredentials: true,
    }).then((res) => {
      console.log(email);
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };

  const getUser = () => {
    axios.get('/auth/local/user', {
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Form>
      {/* <Form.Group controlId='formBasicName'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' placeholder='Enter name' 
          onChange={(e) => setName(e.target.value)} />
      </Form.Group> */}
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
        <Form.Check type='checkbox' label='Check me out' />
      </Form.Group>
      <Button variant='primary' onClick={login}>
        Submit
      </Button>
      <Button variant='primary' onClick={getUser}>
        Get Current User
      </Button>
    </Form>
  );
};

export default LoginForm;
