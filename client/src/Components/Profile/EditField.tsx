/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import PetPlantCard, { PetPlant } from './PetPlantCard';
import { RatingInfo, Profile } from '../../Pages/Profile';
import RangeSlider from 'react-bootstrap-range-slider';
import axios from 'axios';
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit';
import { AiFillSave } from '@react-icons/all-files/ai/AiFillSave';
import { BiCurrentLocation } from '@react-icons/all-files/bi/BiCurrentLocation';

type Props = {
  user: Profile | null;
  Pet_Plant: PetPlant | null;
  fieldName: string;
  value: string | number | boolean | RatingInfo[] | string[] | PetPlant[];
  add: boolean;
  newPetId: number;
  setVal: (val: any) => void;
};

declare global {
  interface Window {
    cloudinary: any;
  }
}
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
  const [values, setValues] = useState(
    value === 'Puppy'
      ? 0
      : value === 'Adult'
      ? 1
      : value === 'Senior'
      ? 2
      : value
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const showWidget = () => {
    const widget = window?.cloudinary.openUploadWidget(
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
      console.log(newPetId);
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
            <Button
              variant='light'
              onClick={() => {
                setVal(null);
              }}
            >
              Light Mode
            </Button>
            <Button
              variant='dark'
              onClick={() => {
                setVal('dark');
              }}
            >
              Dark Mode
            </Button>
          </div>
        );
      case 'gender':
        return (
          Pet_Plant.is_plant === false && (
            <div>
              <Button
                variant='primary'
                onClick={() => {
                  setVal('Male');
                }}
              >
                Male
              </Button>{' '}
              <Button
                variant='primary'
                onClick={() => {
                  setVal('Female');
                }}
              >
                Female
              </Button>
            </div>
          )
        );
      case 'tags':
        return (
          Pet_Plant.is_plant === false && (
            <div>
              <Button variant='primary'>Male</Button>{' '}
              <Button variant='primary'>Female</Button>
            </div>
          )
        );
      case 'location':
        return (
          <>
            <span>
              {editable ? (
                <input value={value} onChange={(e) => handleChange(e)} />
              ) : fieldName === 'image' ? (
                <div></div>
              ) : (
                <p>
                  {value}
                  {
                    <>
                      <AiFillEdit
                        size={28}
                        style={{
                          marginLeft: '10px',
                          borderRadius: '50%',
                          border: '1px solid black',
                        }}
                        onClick={(e) => {
                          // console.log('what');
                          e.preventDefault();
                          if (fieldName === 'image') {
                            showWidget();
                          } else {
                            setEditable(!editable);
                          }
                        }}
                      />
                      <BiCurrentLocation
                        size={28}
                        style={{
                          marginLeft: '10px',
                          borderRadius: '50%',
                          border: '1px solid black',
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          const getLocation = () => {
                            navigator.geolocation.getCurrentPosition(function (
                              position
                            ) {
                              console.log(
                                'Latitude is :',
                                position.coords.latitude
                              );
                              const lat = position.coords.latitude;
                              console.log(
                                'Longitude is :',
                                position.coords.longitude
                              );
                              const long = position.coords.longitude;
                              console.log(process.env.MAPBOX_TOKEN);
                              console.log(lat, long);
                              axios
                                .get(
                                  `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${process.env.MAPBOX_TOKEN}`
                                )
                                .then((results: any) => {
                                  console.log(results);
                                  console.log(
                                    results.data.features[0].place_name
                                  );
                                  setVal(results.data.features[0].place_name);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            });
                          };
                          getLocation();
                        }}
                      />
                    </>
                  }
                </p>
              )}
              {editable && (
                <AiFillSave
                  size={28}
                  style={{
                    marginLeft: '10px',
                    borderRadius: '50%',
                    border: '1px solid black',
                  }}
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  Save
                </AiFillSave>
              )}
            </span>
          </>
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
              <p>
                {value}
                {
                  <AiFillEdit
                    size={28}
                    style={{
                      marginLeft: '10px',
                      borderRadius: '50%',
                      border: '1px solid black',
                    }}
                    onClick={(e) => {
                      // console.log('what');
                      e.preventDefault();
                      if (fieldName === 'image') {
                        showWidget();
                      } else {
                        setEditable(!editable);
                      }
                    }}
                  />
                }
              </p>
            )}
            {editable && (
              <AiFillSave
                size={28}
                style={{
                  marginLeft: '10px',
                  borderRadius: '50%',
                  border: '1px solid black',
                }}
                onClick={(e: any) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                Save
              </AiFillSave>
            )}
          </span>
        );
      case 'age':
        return (
          Pet_Plant.is_plant === false && (
            <div>
              {console.log(values)}
              <RangeSlider
                value={values}
                onChange={(e) => setValues(e.target.value)}
                min={0}
                max={2}
                tooltip='on'
                tooltipPlacement='bottom'
                tooltipLabel={(currentValue) => {
                  if (currentValue === 0) {
                    setVal('Puppy');
                    return 'Puppy';
                  } else if (currentValue === 1) {
                    setVal('Adult');
                    return 'Adult';
                  } else if (currentValue === 2) {
                    setVal('Senior');
                    return 'Senior';
                  }
                }}
                tooltipStyle={{ backgroundColor: 'red' }}
              />
            </div>
          )
        );
      case 'image':
        return (
          <div>
            <img
              src={value}
              alt='profile picture'
              width='160'
              height='160'
              onClick={() => {
                showWidget();
              }}
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
                <p>
                  {value}
                  {
                    <AiFillEdit
                      size={28}
                      style={{
                        marginLeft: '10px',
                        borderRadius: '50%',
                        border: '1px solid black',
                      }}
                      onClick={(e) => {
                        // console.log('what');
                        e.preventDefault();
                        if (fieldName === 'image') {
                          showWidget();
                        } else {
                          setEditable(!editable);
                        }
                      }}
                    />
                  }
                </p>
              )}
              {editable && (
                <AiFillSave
                  size={28}
                  style={{
                    marginLeft: '10px',
                    borderRadius: '50%',
                    border: '1px solid black',
                  }}
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  Save
                </AiFillSave>
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
          : fieldName === 'age' && Pet_Plant.is_plant === true
          ? ''
          : fieldName[0].toUpperCase() + fieldName.slice(1)}
      </h2>
      {renderSwitch(fieldName)}
    </Form.Group>
  );
};

export default EditField;
