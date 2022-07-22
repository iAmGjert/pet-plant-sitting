import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
// import './fern-herm-logo.svg';

const LoginForm = () => {
  const theme = useContext(ThemeContext);
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
    <Form className='login-form'>
      <img className="fern-herm-logo" src={require('../../../Public/svg/fern-herm-logo.svg')} alt="Fern and Herm logo"  
        style={{
          filter: theme === 'dark' && 'invert(100%)',  
        }} />
     
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control className='bootstrap-textbox' type='email' placeholder='Enter email' 
          onChange={(e) => setEmail(e.target.value)} required/>
        {/* <Form.Text className='text-muted'>
          Well never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicPassword'>
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control className='bootstrap-textbox' type='password' placeholder='Password' 
          onChange={(e) => setPassword(e.target.value)} required/>
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicCheckbox'>
      </Form.Group>
      <Button className='bootstrap-button login-btn' href='/loading' onClick={login}>
        Login
      </Button>
      <div id="login-footer" >
        <span>new to fern herm? </span>
        <span>
          <Button className='button-as-link sign-up-btn' variant='link' 
            onClick={navigateRegister}>Sign Up</Button>
        </span>
      </div>
    </Form>
  );
};

export default LoginForm;
