import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import PetPlantCard, { PetPlant } from './PetPlantCard';
import { RatingInfo, Profile } from '../../Pages/Profile';
import axios from 'axios';

type Props = {
  user: Profile | null;
  Pet_Plant: PetPlant | null;
  fieldName: string;
  value: string | number | boolean | RatingInfo[] | string[] | PetPlant[];
};

const EditField = ({ fieldName, value, user, Pet_Plant }: Props) => {
  const [editable, setEditable] = useState(false);
  const [newImgCloud, setNewImgCloud] = useState('');
  const [editField, setEditField] = useState<string>(
    fieldName === 'pet_plants' ? '' : String(value)
  );
  // const [fieldName, setFieldName] = useState(field);
  // console.log(typeof field);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditField(e.target.value);
    // console.log(editField);
  };
  const widget = window?.cloudinary.createUploadWidget(
    {
      cloudName: 'ibeno',
      uploadPreset: 'trivia',
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
      if (Pet_Plant) {
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
  }, [newImgCloud, Pet_Plant, user, fieldName]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditable(false);
    if (Pet_Plant) {
      axios.put(`/api/pets_plants/${Pet_Plant.id}`, {
        ...Pet_Plant,
        [fieldName]: editField,
      });
    } else {
      axios.put(`/api/users/${user.id}`, { ...user, [fieldName]: editField });
    }
  };

  return (
    <Form.Group className='mb-3' controlId='formBasicEmail'>
      <h1>{fieldName[0].toUpperCase() + fieldName.slice(1)}</h1>
      {fieldName !== 'pet_plants' ? (
        <>
          <span>
            {editable ? (
              <input value={editField} onChange={(e) => handleChange(e)} />
            ) : fieldName === 'image' ? (
              <div></div>
            ) : (
              <p>{editField}</p>
            )}
            {editable ? (
              <button
                onClick={(e: any) => {
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
              getStars={null}
            />
          );
        })
      )}
    </Form.Group>
  );
};

export default EditField;
