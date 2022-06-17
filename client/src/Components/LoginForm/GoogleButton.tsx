import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';

const GoogleButton = () => {
  const loginUser = async () => {
    const user = await axios.get(
      `${process.env.CLIENT_URL}:${process.env.PORT}/auth/login/success`
    );
    console.log(user);
  };

  return (
    <div>
      <Button
        variant='primary'
        size='lg'
        href={`${process.env.CLIENT_URL}:${process.env.PORT}/auth/google`}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default GoogleButton;
