import React, { useState, FC } from 'react';
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
// import { Scheduler } from '@devexpress/dx-react-scheduler-material-ui';
// import { DayView } from '@devexpress/dx-react-scheduler-material-ui';
// import { WeekView } from '@devexpress/dx-react-scheduler-material-ui';

import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';

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

  //console.log('jobs on 61 practice', jobs);
  //console.log('events', events); //such is empty
  //console.log(user);

  // console.log(
  //   'petplants',
  //   jobs.map((job: { job_pets_plants: any }) => {
  //     return job.job_pets_plants;
  //   })
  //   // .map((pet) => {
  //   //   return pet.image;
  //   // })
  // );

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
          id: job.id,
          location: job.location,
          petPlants: job.job_pets_plants,
          // name: job.job_pet_plants.map((pet: { name: any }) => {
          //   return pet.name;
          // }),
        };
      }
    );

  //console.log(schedulerData);
  //console.log('userJobs', userJobs);

  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const onCurrentDateChange = (_currentDate: React.SetStateAction<string>) => {
    setCurrentDate(_currentDate);
  };

  const AppointmentContent = ({ appointmentData }) => {
    //console.log('appointment props', props);
    return (
      <div>
        {/* {appointmentData.petPlant.map((pet) => {
          return <img src={appoinmentData.pet_plant.image} key={pet.id} />;
        })} */}
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
