import React, {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

const Job = ({ job }) => {
  const {id, location, pet_plant, employer_id, sitter_id, startDate, endDate} = job;
  return (
    <div className='testDiv'>
      {
        `id: ${id}, location: ${location}, pet_plant: ${pet_plant}, employer_id: ${employer_id}, sitter_id: ${sitter_id}, startDate: ${startDate}, endDate: ${endDate}`
      }
    </div>
  );
};

Job.propTypes = {};

export default Job;
