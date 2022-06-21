import React, { FC, useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../state/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const LandingPage: FC<Props> = () => {
  const user = useAppSelector((state) => state.userProfile.value);
  const users = useAppSelector((state) => state.userProfile.users);
  const petPlants = useAppSelector((state) => state.petPlant.petPlants);
  const jobs = useAppSelector((state) => state.job.jobs);

  return (
    <div>
      <h1>Welcome {user.name ? `, ${user.name}!` : '!'}</h1>
      <p> Fern Herm is happy to have you!</p>
    </div>
  );
};

export default LandingPage;
