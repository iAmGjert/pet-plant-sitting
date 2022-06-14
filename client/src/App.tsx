import React, { FC } from 'react';
<<<<<<< HEAD
=======
import { useAppSelector, useAppDispatch } from './state/hooks';
import { changeName } from './state/features/userProfile/userProfileSlice';
>>>>>>> 9b4bc7e9403066aa7cc8755fbe3fcda2b71ef41e

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  
}
 
const App: FC<Props> = () => {
<<<<<<< HEAD
  
=======
  const userName = useAppSelector(state => state.userProfile.value);
  const dispatch = useAppDispatch();
 
  const handleClick = () => {
    console.log('You clicked me!');
    dispatch(changeName('Iben O\'Neal'));
  };

>>>>>>> 9b4bc7e9403066aa7cc8755fbe3fcda2b71ef41e
  return ( 
    <div>
      <h1>Hello world {userName}</h1>
      <button onClick={()=>{ handleClick(); }}>Click Me!</button>
    </div>
  );
};
 
export default App;
