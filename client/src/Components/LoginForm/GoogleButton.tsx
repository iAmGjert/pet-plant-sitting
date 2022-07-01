import React from 'react';
import { Button } from 'react-bootstrap';

const GoogleButton = () => {
  return (
    <div>
      <Button
        className='bootstrap-button'
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
