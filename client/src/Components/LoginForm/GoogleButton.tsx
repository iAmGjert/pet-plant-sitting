import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const GoogleButton = () => {
  return (
    <div>
      <Button
        variant='primary'
        size='lg'
        href='http://localhost:5000/auth/google'
      >
        Login with Google
      </Button>
    </div>
  );
};

export default GoogleButton;
