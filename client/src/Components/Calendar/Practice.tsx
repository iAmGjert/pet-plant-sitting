import React, { useEffect, useState, FC } from 'react';
import moment from 'moment';

//schedule
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';

import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
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

//2. ENSURE THAT SCHEDULER RUNS INFINITELY
//3. OFFER USER DIFFERENT VIEWS OF CALENDAR WITH SAME FUNCTIONALITY
//4. FIGURE OUT A WAY TO SPAN JOB STARTDATES AND ENDDATES IN CALENDAR

const Practice: FC<Props> = () => {
  //const currentDate = moment().format('YYYY-MM-DD'); //2022-06-29

  const jobs = useAppSelector((state) => state.job.jobs);
  const events = useAppSelector((state) => state.events.events);
  const user = useAppSelector((state) => state.userProfile.value);

  console.log('jobs on 61 practice', jobs);
  console.log('events', events); //such is empty
  console.log(user);

  //function to filter user appointments
  const userJobs = jobs
    .filter((job: { sitter_id: number }) => {
      return job.sitter_id === user.id;
    })
    .map((job) => {
      return {
        ...job,
        title: job.description,
        startDate: moment(job.startDate).toDate(),
        endDate: moment(job.endDate).toDate(),
        id: job.id,
        location: job.location,
      };
    });

  //console.log(schedulerData);
  console.log('userJobs', userJobs);

  /* [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 5, 25, 9, 35),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 0,
    location: 'Room 1',
  }, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2018, 5, 25, 12, 11),
    endDate: new Date(2018, 5, 25, 13, 0),
    id: 1,
    location: 'Room 1',
  }
]
  */

  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const onCurrentDateChange = (_currentDate) => {
    setCurrentDate(_currentDate);
  };

  const AppointmentContent = ({ appointmentData }) => {
    //console.log('appointment props', props);
    return <div>{appointmentData.description}</div>;
  };

  return (
    <Paper>
      <Scheduler data={userJobs}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={onCurrentDateChange}
        />
        <DayView startDayHour={0} endDayHour={23} cellDuration={60} />
        <WeekView startDayHour={0} endDayHour={23} cellDuration={60} />

        <MonthView startDayHour={0} endDayHour={23} cellDuration={60} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <Appointments />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
          contentComponent={AppointmentContent}
        />
        <AppointmentForm readOnly />
      </Scheduler>
    </Paper>
  );
};

export default Practice;
