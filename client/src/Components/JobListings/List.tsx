import React, {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Job from './Job';

const List = () => {

  //const jobs = useAppSelector((state)=>state.job.jobs);
  const user = useAppSelector((state)=>state.userProfile.value);
  const jobs = useAppSelector((state)=>state.job.jobs); 
  return (
    <div>
      <h1>Job List</h1>
      {
        Array.isArray(jobs) ?
          jobs.map((job, index)=>{
            return (<div key={`job#${index}`}>
              <Job job={job} />
            </div>);
          }) :
          <div>NotArray</div>
      }
    </div>
  );
};

List.propTypes = {};

export default List;
