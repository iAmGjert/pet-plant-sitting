import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import PetPlantCard, { PetPlant } from './PetPlantCard';
import { RatingInfo, Profile } from '../../Pages/Profile';
import axios from 'axios';
type Props = {
  user: Profile | null;
  Pet_Plant: PetPlant | null;
  fieldName: string;
  value: string | number | boolean | PetPlant[] | RatingInfo[];
};

const EditField = ({ fieldName, value, user, Pet_Plant }: Props) => {
  const [editible, setEditable] = useState(false);
  const [editField, setEditField] = useState(
    fieldName === 'pet_plants' ? '' : value
  );
  // const [fieldName, setFieldName] = useState(field);
  // console.log(typeof field);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditField(e.target.value);
    // console.log(editField);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditable(false);
    if (Pet_Plant) {
      axios
        .put(`/api/pets_plants/${Pet_Plant.id}`, {
          ...Pet_Plant,
          [fieldName]: editField,
        })
        .then((res) => {
          // console.log(res);
        });
    } else {
      axios
        .put(`/api/users/${user.id}`, { ...user, [fieldName]: editField })
        .then((res) => {
          // console.log(res);
        });
    }
  };

  return (
    <Form.Group className='mb-3' controlId='formBasicEmail'>
      <h1>{fieldName[0].toUpperCase() + fieldName.slice(1)}</h1>
      {fieldName !== 'pet_plants' ? (
        <>
          <span>
            {editible ? (
              <input value={editField} onChange={(e) => handleChange(e)} />
            ) : (
              <p>{editField}</p>
            )}
            {editible ? (
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={(e) => {
                  // console.log('what');
                  e.preventDefault();
                  setEditable(!editible);
                }}
              >
                Edit
              </button>
            )}
          </span>
        </>
      ) : (
        value.map((petPlant: PetPlant, i: number) => {
          return (
            <PetPlantCard
              key={'petPlant' + i}
              PetPlant={petPlant}
              edit={true}
            />
          );
        })
      )}
    </Form.Group>
  );
};

export default EditField;
