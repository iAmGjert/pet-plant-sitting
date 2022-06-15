import React from 'react';
import Create from '../Components/JobListings/Create';
import List from '../Components/JobListings/List';
import Search from '../Components/JobListings/Search';

const JobsMain = () => {
  return (
    <div className='welcome'>
      <h1>Available Jobs:</h1>
      <List />
    </div>
  );
};

export default JobsMain;
