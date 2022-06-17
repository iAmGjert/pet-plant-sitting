import React from 'react';
import Create from '../Components/JobListings/Create';
import List from '../Components/JobListings/List';
import Search from '../Components/JobListings/Search';
import { Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { changeView, } from '../state/features/jobs/jobSlice';

const JobsMain = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state)=>state.job.view);
  const jobs = useAppSelector((state)=>state.job.jobs);
  const handleClick = () => {
    if (view !== 'create') {
      dispatch(changeView('create'));
      return;
    }
    dispatch(changeView('list'));
  };
  const handleTest = ()=>{
    console.log(jobs);
  };
  return (
    <div className='welcome'>
      <h1>
        {
          view === 'create' ?
            <Create /> :
            view === 'search' ?
              <Search /> :
              <List />
            
        }
      </h1>
      <Button onClick={()=>{ handleClick(); }}>{view === 'create' ? 'Return to Job List' : 'Create New Job'}</Button>
      <button onClick={()=>{ handleTest(); }}>Test Button</button>
    </div>
  );
};

export default JobsMain;
