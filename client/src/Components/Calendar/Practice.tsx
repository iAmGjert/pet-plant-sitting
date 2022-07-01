import React, { useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import moment from 'moment';

//schedule
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';

import { Scheduler } from '@devexpress/dx-react-scheduler-material-ui';
import { DayView } from '@devexpress/dx-react-scheduler-material-ui';
//import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';

//Redux
import { useAppSelector, useAppDispatch } from '../../state/hooks';

//typescript;
interface jobs {
  id: number;
  location: string;
  employer_id: number;
  sitter_id: number | null;
  startDate: Date;
  endDate: Date;
  pet_plant: Array<number>;
  isCompleted: boolean;
}

interface events {
  id: number;
  location: string;
  startDate: Date;
  endDate: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

//1. CONNECT DATES FROM JOBS AND EVENTS TO CALENDAR DATES. MAKE THEM RENDER
//2. ENSURE THAT SCHEDULER RUNS INFINITELY
//3. OFFER USER DIFFERENT VIEWS OF CALENDAR WITH SAME FUNCTIONALITY
//4. FIGURE OUT A WAY TO SPAN JOB STARTDATES AND ENDDATES IN CALENDAR

const Practice: FC<Props> = () => {
  const currentDate = moment().format('YYYY-MM-DD'); //2022-06-29
  // const dispatch = useAppDispatch();

  const jobs = useAppSelector((state) => state.job.jobs);
  const events = useAppSelector((state) => state.events.events);
  const user = useAppSelector((state) => state.userProfile.value);

  const [dateState, setDateState] = useState(new Date());

  console.log('jobs on 61 practice', jobs);
  //console.log('events', events);//such is empty
  console.log(user);

  //function to filter user appointment/event data
  const userJobs = jobs.filter((job: { sitter_id: number }) => {
    return job.sitter_id === user.id;
  });

  const newDate = moment(dateState).format('yyyy-MM-DD');
  console.log(newDate);

  //setDateState(newDate);
  const filteredDate = userJobs.filter((job) => {
    job.startDate === newDate;
  });

  //console.log(schedulerData);
  console.log('userJobs', userJobs);

  // useEffect(() => {
  //   // getAllJobs();
  // }, [dateState]);

  return (
    <Paper>
      <Scheduler>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={0} endDayHour={23} cellDuration={60} />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default Practice;
