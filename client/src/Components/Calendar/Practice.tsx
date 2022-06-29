import React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
//schedule
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';

import { Scheduler } from '@devexpress/dx-react-scheduler-material-ui';
import { DayView } from '@devexpress/dx-react-scheduler-material-ui';
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

const currentDate = '2022-06-28';
// const schedulerData = [
//   {
//     startDate: '2022-06-01T09:45',
//     endDate: '2022-06-01T11:00',
//     title: 'Sitting',
//   },
//   {
//     startDate: '2022-06-01T12:00',
//     endDate: '2018-06-01T13:30',
//     title: 'Go to a gym',
//   },
// ];

const Practice: FC<Props> = () => {
  const dispatch = useAppDispatch();

  const jobs = useAppSelector((state) => state.job.jobs);
  const events = useAppSelector((state) => state.events.events);

  console.log('jobs on 61 practice', jobs);

  // useEffect(() => {

  // }, []);
  return (
    <Paper>
      <Scheduler data={jobs}>
        <ViewState currentDate={currentDate} />
        <DayView startDayHour={0} endDayHour={23} cellDuration={60} />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default Practice;
