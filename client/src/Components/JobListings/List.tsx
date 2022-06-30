import React, {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Job from './Job';
import { ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import moment from 'moment';

const List = () => {

  //const jobs = useAppSelector((state)=>state.job.jobs);
  const user = useAppSelector((state)=>state.userProfile.value);
  const jobs = useAppSelector((state)=>state.job.jobs);
  const [view, setView] = useState('Available Jobs');
  return (
    <>
      <DropdownButton as={ButtonGroup} title={view} id="bg-nested-dropdown">
        <Dropdown.Item onClick={(e)=>{ setView(e.target.textContent); }} eventKey="1">Available Jobs</Dropdown.Item>
        <Dropdown.Item onClick={(e)=>{ setView(e.target.textContent); }} eventKey="2">My Jobs</Dropdown.Item>
        <Dropdown.Item onClick={(e)=>{ setView(e.target.textContent); }} eventKey="2">My Applications</Dropdown.Item>
      </DropdownButton>
      {
        view === 'Available Jobs' && Array.isArray(jobs) ?
          user?.name !== '' ?
            jobs.filter((job)=>{
              if (job.employer_id !== user.id) {
                for (let i = 0; i < job.job_applicants.length; i++) {
                  if (job.job_applicants[i].user_id === user.id) {
                    return false;
                  }
                }
                if (job.sitter_id === null) {
                  return true;
                }
              }
              return false; 
            }).filter((job)=>{
              if (moment(job.startDate).diff(moment(), 'days') < 0) {
                return false;
              }
              return true;
            }).map((job, index)=>{
              return (<div key={`job#${index}`}>
                <Job job={job} />
              </div>);
            }) :
            jobs.filter((job)=>{
              if (moment(job.startDate).diff(moment(), 'days') < 0) {
                return false;
              }
              if (job.sitter_id !== null) {
                return false;
              }
              return true;
            }).map((job, index)=>{
              return (<div key={`job#${index}`}>
                <Job job={job} />
              </div>);
            }) :
          view === 'My Jobs' && Array.isArray(jobs) && user.name !== '' ?
            
            jobs.filter((job)=>{
              if (job.employer_id !== user.id) {
                return false;
              }
              return true; 
            }).map((job, index)=>{
              return (<div key={`job#${index}`}>
                <Job job={job} />
              </div>);
            }) :
            view === 'My Applications' && Array.isArray(jobs) && user.name !== '' ?
              jobs.filter((job)=>{
                for (let i = 0; i < job.job_applicants.length; i++) {
                  if (job.job_applicants[i].user_id === user.id) {
                    return true;
                  }
                }
                return false;
              }).map((job, index)=>{
                return (<div key={`job#${index}`}>
                  <Job job={job} />
                </div>);
              }) :
              <div>Login to view these jobs!</div>
      }
    </>
  );
};

List.propTypes = {};

export default List;
