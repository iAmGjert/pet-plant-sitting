import React from 'react';
import Create from '../Components/JobListings/Create';
import List from '../Components/JobListings/List';
import Search from '../Components/JobListings/Search';
import { useNavigate } from 'react-router-dom';

const JobsMain = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('clicked create job button');
    navigate('/createJob');
  };
  return (
    <div className='welcome'>
      <h1>Available Jobs:</h1>
      <List />
      <button onClick={()=>{ handleClick(); }}>Create Job</button>
    </div>
  );
};

export default JobsMain;
