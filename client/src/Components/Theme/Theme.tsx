import React, { FC, useEffect, useState, useCallback } from 'react';
import ReactSwitch from 'react-switch';



interface Props {
  theme: string
  toggleTheme: any
}

const Theme: FC<Props> = ({ theme, toggleTheme }) => {
  // const dispatch = useAppDispatch();

  // const [updateUser, setUpdateUser] = useState(user);

  // const [render, setRender] = useState(false);

  // const toggleTheme = () => {
  //   axios.patch(`/api/users/${user.id}`, {
  //     theme: user.theme === null ? 'dark' 
  //       : user.theme === 'dark' ? 'light' 
  //         : user.theme === 'light' ? 'dark' 
  //           : null
  //   })
  //     .then(() => {
  //       reRender();
  //       console.log('here');
  //     });
  // };


  // const reRender = () => {
  //   setRender(!render);
  // };

  // const getUser = async () => {
  //   const updateUser = await axios.get(`/api/users/${user.id}`);
  //   setUpdateUser(updateUser);
  //   console.log(user, 'USER');
  //   // console.log(user, 'LOGIN USER/userProfile state is set');
  // };

  // useEffect(() => {
  //   getUser();
  //   console.log('rendered');
  // }, [render]);




  return (
    <div>
      <div className='theme-switch'>
        <button onClick={toggleTheme} >Switch mode</button>
        {/* <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'} /> */}
      </div>
    </div>
  );
};

export default Theme;
