import React, { useState, FC } from 'react';
import moment from 'moment';
import { Event } from '../../state/features/events/eventsSlice';

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
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
// import { Scheduler } from '@devexpress/dx-react-scheduler-material-ui';
// import { DayView } from '@devexpress/dx-react-scheduler-material-ui';
// import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';

//Redux
import { useAppSelector } from '../../state/hooks';

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

const Practice: FC<Props> = () => {
  //const currentDate = moment().format('YYYY-MM-DD'); //2022-06-29

  const jobs = useAppSelector((state) => state.job.jobs);
  const events = useAppSelector((state) => state.events.events);
  const user = useAppSelector((state) => state.userProfile.value);

  console.log('events', events);
  //console.log(user);

  //function to filter user appointments
  const userJobs = jobs
    .filter((job: { sitter_id: number }) => {
      return job.sitter_id === user.id;
    })
    .map(
      (job: {
        description: any;
        startDate: moment.MomentInput;
        endDate: moment.MomentInput;
        id: any;
        location: any;
        job_pet_plants: any[];
      }) => {
        return {
          ...job,
          title: job.description,
          startDate: moment(job.startDate).toDate(),
          endDate: moment(job.endDate).toDate(),
          type: 'job',
          // petPlants: job.job_pets_plants,
        };
      }
    );

  console.log('userJobs', userJobs);

  const mappedEvents = events.map((event: Event) => {
    return {
      ...event,
      title: event.name,
      id: event.id + 100,
      startDate: moment(event.startDate).toDate(),
      endDate: moment(event.startDate).add(2, 'hours').toDate(),
      type: 'event',
    };
  });

  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));

  const onCurrentDateChange = (_currentDate: React.SetStateAction<string>) => {
    setCurrentDate(_currentDate);
  };

  //combination of jobs and events
  const appointments = userJobs.concat(mappedEvents);
  console.log('appointments', appointments);

  const AppointmentContent = ({ appointmentData }) => {
    //console.log('appointment props', props);
    if (appointmentData.type === 'job') {
      return (
        <div>
          <img src={appointmentData.petPlants[0].pet_plant.image} alt='' />
          <h2>
            {' '}
            Siting for{' '}
            {appointmentData.petPlants.map((pet) => {
              return `${pet.pet_plant.name} | `;
            })}{' '}
          </h2>
          <p>Location: {appointmentData.location}</p>
          <p>Info: {appointmentData.description}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>{appointmentData.name}</h2>
          <p>Location: {appointmentData.location}</p>
          <p>Info: {appointmentData.description}</p>
        </div>
      );
    }
  };

  return (
    <Paper>
      <Scheduler data={appointments}>
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
