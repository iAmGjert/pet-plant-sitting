import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

const Register = () => {
  // const { register, errors, handleSubmit, watch } = useForm({});
  // const password = useRef({});
  // password.current = watch("password", "");
  // const onSubmit = async data => {
  //   alert(JSON.stringify(data));
  // };
  const navigate = useNavigate();




  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const registerUser = () => {
    axios.post('/auth/local/register', {
      name: `${firstName} ${lastName}`,
      username: email,
      password,
      location,
    }, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      res.data.user ? 
        axios.post('/auth/local/login', {
          username: email,
          password,
        }, {
          withCredentials: true,
        }).then((res) => {
          console.log(res);
          // navigate('/');
        }).catch((err) => {
          console.log(err);
        })
        : alert('Failure!');
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicFirstName'>
        <Form.Label>First Name</Form.Label>
        <Form.Control className='bootstrap-textbox' type='text' placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)} required/>
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicLastName'>
        <Form.Label>Last Name</Form.Label>
        <Form.Control className='bootstrap-textbox' type='text' placeholder='Last Name' 
          onChange={(e) => setLastName(e.target.value)} required/>
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control className='bootstrap-textbox' type='email' placeholder='Enter email' 
          onChange={(e) => setEmail(e.target.value)} required/>
        <Form.Text className='text-muted'>
          Well never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control className='bootstrap-textbox' type='password' placeholder='Password' 
          onChange={(e) => setPassword(e.target.value)} required/>
      </Form.Group>
      {/* <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control className='bootstrap-textbox' type='password' placeholder='Confirm Password' 
          onChange={(e) => setPasswordConfirm(e.target.value)} required/>
      </Form.Group> */}
      <Form.Group className='mb-3' controlId='formBasicLocation'>
        <Form.Label>Location</Form.Label>
        <Form.Control className='bootstrap-textbox' type='text' placeholder='optional' 
          onChange={(e) => setLocation(e.target.value)} required/>
      </Form.Group>
      <Button className='bootstrap-button' variant='primary' href='/login' onClick={registerUser}>
        Submit
      </Button>
    </Form> 
  );
};

export default Register;
