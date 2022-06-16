import React from 'react';
import Create from '../Components/JobListings/Create';
import List from '../Components/JobListings/List';
import Search from '../Components/JobListings/Search';
import { useNavigate } from 'react-router-dom';

const JobCreation = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    
    if (confirm('Click OK to submit your new job, or cancel to continue editing.')) {
      console.log('Form submitted.');
      navigate('/jobs');
      return;
    }
    console.log('Form not submitted.');
  };
  
  return (
    <div className='welcome'>
      <h1>New Job Form:</h1>
      <Create />
      <button onClick={()=>{ handleClick(); }}>Submit Job</button>
    </div>
  );
};

export default JobCreation;
