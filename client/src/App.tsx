import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from './state/hooks';
import { changeName } from './state/features/userProfile/userProfileSlice';
import Calendar from './Components/Calendar/Calendar';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  
}
 
const App: FC<Props> = () => {
  const userName = useAppSelector(state => state.userProfile.value);
  const dispatch = useAppDispatch();
 
  const handleClick = () => {
    console.log('You clicked me!');
    dispatch(changeName('Iben O\'Neal'));
  };

  return ( 
    <div>
      <h1>Hello world {userName}</h1>
      <button onClick={()=>{ handleClick(); }}>Click Me!</button>
      <Calendar />
    </div>
  );
};
 
export default App;
