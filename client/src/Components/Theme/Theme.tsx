import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { SunFill, MoonFill} from 'react-bootstrap-icons';

interface Props {
  theme: string
  toggleTheme: any
}

const Theme: FC<Props> = ({ theme, toggleTheme }) => {

  return (
    <div>
      <div className='theme-switch' 
        onClick={toggleTheme}
        onKeyPress={toggleTheme}
        role='button' 
        tabIndex={0}
      >
        {theme === 'dark' ? <MoonFill /> : <SunFill />}
      </div>
    </div>
  );
};

export default Theme;
