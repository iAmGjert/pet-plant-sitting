import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import '../../css/Login.css';

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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { firstName, lastName, email, password, location } = data;
    try {
      const res = await axios.post(
        '/auth/local/register',
        {
          name: `${firstName} ${lastName}`,
          username: email,
          password,
          location,
        },
        {
          withCredentials: true,
        }
      );
      navigate('/login');
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='login-container-register'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='firstName'>Enter Your First Name: </label>
        <input
          className='bootstrap-textbox'
          type='text'
          name='first-name'
          {...register('firstName', {
            required: true /*pattern: /^[a-zA-Z]{3,15}$/i*/,
          })}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <label htmlFor='lastName'>Enter Your Last Name: </label>
        <input
          className='bootstrap-textbox'
          type='text'
          name='last-name'
          {...register('lastName', {
            required: true /*pattern: /^[a-zA-Z]{3,15}$/i*/,
          })}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <label htmlFor='email'>Enter Your Email: </label>
        <input
          className='bootstrap-textbox'
          type='email'
          name='email'
          {...register('email', {
            required: true,
            maxLength: 30,
            pattern:
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
        />
        {errors.email && <p>Please enter a valid email</p>}

        <label htmlFor='password'>Create a New Password: </label>
        <input
          className='bootstrap-textbox'
          type='password'
          name='password'
          {...register('password', {
            required: true,
            maxLength: 30,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor='confirmPassword'>Confirm Your Password: </label>
        <input
          className='bootstrap-textbox'
          type='password'
          name='confirmPassword'
          {...register('confirmPassword', {
            required: true,
            maxLength: 30,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          })}
        />
        {errors.confirmPassword && <p>Passwords Should Match!</p>}

        <label htmlFor='location'>Please Enter Your Location: </label>
        <input
          className='bootstrap-textbox'
          type='text'
          name='location'
          {...register('location', { required: false, maxLength: 50 })}
        />

        <input className='register-submit-btn' type='submit' />
      </form>
    </div>
  );
};

export default Register;
