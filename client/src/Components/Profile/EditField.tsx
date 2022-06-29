/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import PetPlantCard, { PetPlant } from './PetPlantCard';
import { RatingInfo, Profile } from '../../Pages/Profile';
import RangeSlider from 'react-bootstrap-range-slider';
import axios from 'axios';

type Props = {
  user: Profile | null;
  Pet_Plant: PetPlant | null;
  fieldName: string;
  value: string | number | boolean | RatingInfo[] | string[] | PetPlant[];
  add: boolean;
  newPetId: number;
  setVal: (val: any) => void;
};

const EditField = ({
  fieldName,
  value,
  user,
  Pet_Plant,
  add,
  newPetId,
  setVal,
}: Props) => {
  const [editable, setEditable] = useState(false);
  const [newImgCloud, setNewImgCloud] = useState('');
  const [values, setValues] = useState(1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  const widget = window?.cloudinary.createUploadWidget(
    {
      cloudName: process.env.CLOUDINARY_NAME,
      uploadPreset: process.env.CLOUDINARY_PRESET,
    },
    (error: Error, result: any) => {
      if (result.event === 'success') {
        setNewImgCloud(result.info.url);
      }
    }
  );
  const showWidget = () => {
    widget.open();
  };
  useEffect(() => {
    if (newImgCloud) {
      setVal(newImgCloud);
      if (add) {
        axios.put(`/api/pets_plants/${newPetId}`, {
          [fieldName]: newImgCloud,
          id: newPetId,
        });
      } else if (Pet_Plant) {
        axios.put(`/api/pets_plants/${Pet_Plant.id}`, {
          ...Pet_Plant,
          [fieldName]: newImgCloud,
        });
      } else {
        axios.put(`/api/users/${user.id}`, {
          ...user,
          [fieldName]: newImgCloud,
        });
      }
    }
  }, [newImgCloud, Pet_Plant, user, fieldName, add, newPetId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditable(false);
    if (add) {
      axios.put(`/api/pets_plants/${newPetId}`, {
        [fieldName]: value,
        id: newPetId,
      });
    } else if (Pet_Plant) {
      axios.put(`/api/pets_plants/${Pet_Plant.id}`, {
        ...Pet_Plant,
        [fieldName]: value,
      });
    } else {
      axios.put(`/api/users/${user.id}`, { ...user, [fieldName]: value });
    }
  };

  const renderSwitch = (fieldName: any) => {
    switch (fieldName) {
      case 'pet_plants':
        return value.map((petPlant: PetPlant, i: number) => {
          return (
            <PetPlantCard
              key={'petPlant' + i}
              PetPlant={petPlant}
              edit={true}
              getStars={null}
            />
          );
        });
      case 'theme':
        return (
          <div>
            <Button variant='light'>Light Mode</Button>{' '}
            <Button variant='dark'>Dark Mode</Button>
          </div>
        );
      case 'gender':
        return (
          <div>
            <Button variant='primary'>Male</Button>{' '}
            <Button variant='primary'>Female</Button>
          </div>
        );
      case 'bio':
        return (
          <span>
            {editable ? (
              <Form.Control
                as='textarea'
                rows={10}
                value={value}
                onChange={(e) => handleChange(e)}
              />
            ) : (
              // <textarea value={value} onChange={(e) => handleChange(e)} />
              <p>{value}</p>
            )}
            {editable ? (
              <Button
                variant='secondary'
                onClick={(e: any) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant='secondary'
                onClick={(e) => {
                  // console.log('what');
                  e.preventDefault();
                  if (fieldName === 'image') {
                    showWidget();
                  } else {
                    setEditable(!editable);
                  }
                }}
              >
                {newImgCloud
                  ? 'Image Uploaded!'
                  : fieldName === 'image'
                  ? 'Upload New Image'
                  : 'Edit'}
              </Button>
            )}
          </span>
        );
      case 'age':
        return (
          <div>
            <RangeSlider
              value={values}
              onChange={(e) => setValues(e.target.value)}
              min={1}
              max={3}
              tooltip='on'
              tooltipPlacement='bottom'
              tooltipLabel={(currentValue) => {
                if (currentValue === 1) {
                  return 'Puppy';
                } else if (currentValue === 2) {
                  return 'Adult';
                } else if (currentValue === 3) {
                  return 'Senior';
                }
              }}
              tooltipStyle={{ backgroundColor: 'red' }}
            />
          </div>
        );
      default:
        return (
          <>
            <span>
              {editable ? (
                <input value={value} onChange={(e) => handleChange(e)} />
              ) : fieldName === 'image' ? (
                <div></div>
              ) : (
                <p>{value}</p>
              )}
              {editable ? (
                <Button
                  variant='secondary'
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant='secondary'
                  onClick={(e) => {
                    // console.log('what');
                    e.preventDefault();
                    if (fieldName === 'image') {
                      showWidget();
                    } else {
                      setEditable(!editable);
                    }
                  }}
                >
                  {newImgCloud
                    ? 'Image Uploaded!'
                    : fieldName === 'image'
                    ? 'Upload New Image'
                    : 'Edit'}
                </Button>
              )}
            </span>
          </>
        );
    }
  };

  return (
    <Form.Group className='mb-3' controlId='formBasicEmail'>
      <h2>
        {fieldName === 'pet_plants'
          ? 'Pets and Plants'
          : fieldName[0].toUpperCase() + fieldName.slice(1)}
      </h2>
      {renderSwitch(fieldName)}
    </Form.Group>
  );
};

export default EditField;
