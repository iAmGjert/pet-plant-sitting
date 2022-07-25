/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useRef, useEffect } from 'react';
import { Form, Button, Overlay } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';


const LoginForm = () => {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const target = useRef(null);

  const navigate = useNavigate();
  console.log(errorMessage, showError, successMessage);


  const login = async () => {
    try {
      const res = await axios.post('/auth/local/login', {
        username: email,
        password,
      }, {
        withCredentials: true,
      });
      console.log(res.data.message);
      setSuccessMessage(res.data.message);
      return res;
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setShowError(true);
      console.error(error);
    } 
  };
  
  const navigateRegister = () => {
    navigate('/register');
  };
 
  const removeErrorOverlay = () => {
    setTimeout(() => {
      setShowError(false);
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    removeErrorOverlay();
  }, [errorMessage, showError]);


  return (
    <div ref={target}>
      <Overlay target={target.current} show={showError} placement="top">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
              backgroundColor: '#C73E1D',
              padding: '2px 10px',
              color: 'black',
              borderRadius: 3,
              ...props.style,
            }}
          >
            {errorMessage}
          </div>
        )}
      </Overlay>
      <Form className='login-form'>
        <img className="fern-herm-logo" src={require('../../../Public/svg/fern-herm-logo.svg')} alt="Fern and Herm logo" style={{ filter: theme === 'dark' && 'invert(100%)' }} />
     
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Control className='bootstrap-textbox' type='email' placeholder='Enter email' 
            onChange={(e) => setEmail(e.target.value)} required/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Control className='bootstrap-textbox' type='password' placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)} required/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
        </Form.Group>
        <Button className='bootstrap-button login-btn' 
          href={errorMessage == '' ? '/loading' : null} 
          onClick={login}>
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
    </div>
  );
};

export default LoginForm;
