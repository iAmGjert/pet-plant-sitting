import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import Job from './Job';
import {
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Overlay,
  Card,
  Tab,
  Tabs,
} from 'react-bootstrap';
import moment from 'moment';

const List = ({ settemp, setshowapplied, setshowrevoked }) => {
  const target = useRef(null);
  const user = useAppSelector((state) => state.userProfile.value);
  const jobs = useAppSelector((state) => state.job.jobs);
  return (
    <>
      <Tabs
        defaultActiveKey="available jobs"
        id="jobTabs"
        className="job-tab-catagories"
        fill
      >
        <Tab eventKey="available jobs" title="New Jobs">
          {user?.name !== '' ? (
            jobs
              .filter((job) => {
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
              })
              .filter((job) => {
                if (moment(job.endDate).diff(moment(), 'days') < 0) {
                  return false;
                }
                return true;
              }).length > 0 ? (
                jobs
                  .filter((job) => {
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
                  })
                  .filter((job) => {
                    if (moment(job.endDate).diff(moment(), 'days') < 0) {
                      return false;
                    }
                    return true;
                  })
                  .map((job, index) => {
                    return (
                      <Job
                        setshowrevoked={setshowrevoked}
                        key={`job#${index}`}
                        setshowapplied={setshowapplied}
                        job={job}
                      />
                    );
                  })
              ) : (
                <strong>No Jobs to Display!</strong>
              )
          ) : (
            jobs
              .filter((job) => {
                if (moment(job.endDate).diff(moment(), 'days') < 0) {
                  return false;
                }
                if (job.sitter_id !== null) {
                  return false;
                }
                return true;
              })
              .map((job, index) => {
                return (
                  <Job
                    setshowrevoked={setshowrevoked}
                    key={`job#${index}`}
                    setshowapplied={setshowapplied}
                    job={job}
                  />
                );
              })
          )}
        </Tab>
        <Tab eventKey="My Jobs" title="My Jobs">
          {user.name !== '' ? (
            jobs.filter((job) => {
              if (job.employer_id !== user.id) {
                return false;
              }
              return true;
            }).length > 0 ? (
                jobs
                  .filter((job) => {
                    if (job.employer_id !== user.id) {
                      return false;
                    }
                    return true;
                  })
                  .map((job, index) => {
                    return (
                      <Job
                        settemp={settemp}
                        setshowrevoked={setshowrevoked}
                        setshowapplied={setshowapplied}
                        key={`job#${index}`}
                        job={job}
                      />
                    );
                  })
              ) : (
                <strong>No Jobs to Display!</strong>
              )
          ) : (
            <strong>Login to view these jobs!</strong>
          )}
        </Tab>
        <Tab eventKey="My Apps" title="My Apps">
          {user.name !== '' ? (
            jobs.filter((job) => {
              for (let i = 0; i < job.job_applicants.length; i++) {
                if (job.job_applicants[i].user_id === user.id) {
                  return true;
                }
              }
              return false;
            }).length > 0 ? (
                jobs
                  .filter((job) => {
                    for (let i = 0; i < job.job_applicants.length; i++) {
                      if (job.job_applicants[i].user_id === user.id) {
                        return true;
                      }
                    }
                    return false;
                  })
                  .map((job, index) => {
                    return (
                      <Job
                        setshowrevoked={setshowrevoked}
                        key={`job#${index}`}
                        setshowapplied={setshowapplied}
                        job={job}
                      />
                    );
                  })
              ) : (
                <strong>No Jobs to Display!</strong>
              )
          ) : (
            <strong>Login to view these jobs!</strong>
          )}
        </Tab>
      </Tabs>
    </>
  );
};

List.propTypes = {};

export default List;
