import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  theme: string
  toggleTheme: any
}

const Theme: FC<Props> = ({ theme, toggleTheme }) => {

  return (
    <div>
      <div className='theme-switch'>
        <Button className='bootstrap-button' onClick={toggleTheme} >{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</Button>
      </div>
    </div>
  );
};

export default Theme;
