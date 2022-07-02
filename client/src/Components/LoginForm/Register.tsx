import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import './style.css';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  location: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required('name is required'),
  lastName: yup.string().required('name is required'),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required('password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const Register = () => {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { firstName, lastName, email, password, location } = data;
    try {
      const res = await axios.post('/auth/local/register', {
        name: `${firstName} ${lastName}`,
        username: email,
        password,
        location,
      }, {
        withCredentials: true,
      });
      navigate('/login');
      return res;
    } catch (error) {
      console.log(error);      
    }
  };

  return (
    <Container className='Register'><Row><Col><Card>
      <Card.Header className='title'>Create a new user</Card.Header><Card.Body className='inputs'>    
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text" placeholder="First name" name="firstName"
              {...register('firstName', { required: true, /*pattern: /^[a-zA-Z]{3,15}$/i*/ })} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </div>
          <div>
            <input type="text" placeholder="Last name" name="lastName"
              {...register('lastName', {required: true, /*pattern: /^[a-zA-Z]{3,15}$/i*/ })} />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>
          <div>
            <input type="email" placeholder="Email" name="email"
              {...register('email', {required: true, maxLength: 30, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 
              })} />
            {errors.email && <p>That ain&apos;t a valid email fool</p>}
          </div>
          <div>
            <input type="password" placeholder="Password" name="password"
              {...register('password', {required: true, maxLength: 30, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i})} />
            {errors.password && <p>{errors.password.message}</p>} 
          </div>
          <div>
            <input type="password" placeholder="Confirm Password" name="confirmPassword"
              {...register('confirmPassword', {required: true, maxLength: 30, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i})} />
            {errors.confirmPassword && <p>Passwords Should Match!</p>} 
          </div>
          <div>
            <input type='text' placeholder='location' name='location'
              {...register('location', {required: false, maxLength: 50 })} />
          </div>
          <input type="submit" />
        </form>
      </Card.Body>
    </Card></Col></Row></Container>    
  );
};

export default Register;
