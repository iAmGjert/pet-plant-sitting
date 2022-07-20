import React from 'react';
import { Button } from 'react-bootstrap';
import GoogleButton from 'react-google-button';

const Google = () => {
  return (
    <>
      <Button
        name="google"
        className='google-btn'
        variant='light'
        href={'/auth/google'}
      ><GoogleButton />
      </Button>
    </>
  );
};

export default Google;
