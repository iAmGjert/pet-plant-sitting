import React, { FC, useContext } from 'react';
import { ThemeContext } from '../../App';
interface Props {
  trigger: boolean
  setTrigger: any
  children: any
}

const EventPopup: FC <Props> = ({ trigger, setTrigger, children }) => {

  return (trigger) ? (
    <div className='popup'>
      <div className='popup-inner' >
        <button className='close-btn' onClick={setTrigger}>Close</button>
        {children}
      </div>
    </div>
  ) : '';
};

export default EventPopup;
