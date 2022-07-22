/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
import React, { useEffect, useState, useContext } from 'react';
import { Button, Form, ToggleButton, Row } from 'react-bootstrap';

import PetPlantCard, { PetPlant } from './PetPlantCard';
import { RatingInfo, Profile } from '../../Pages/Profile';
import RangeSlider from 'react-bootstrap-range-slider';
import axios from 'axios';
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit';
import { AiFillSave } from '@react-icons/all-files/ai/AiFillSave';
import { BiCurrentLocation } from '@react-icons/all-files/bi/BiCurrentLocation';
import { BiUpload } from '@react-icons/all-files/bi/BiUpload';
import Tags from './Tags';
import { ThemeContext } from '../../App';

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

const petTags = [
  'Energetic',
  'Loud',
  'Playful',
  'Quiet',
  'Independent',
  'Shy',
  'Anxious',
  'Loves Attention',
  'Affectionate',
];

const plantTags = [
  'Prickly',
  'Daily Water',
  'Low-Light',
  'Direct-Light',
  'High Maintenance ',
];

const EditField = ({
  fieldName,
  value,
  user,
  Pet_Plant,
  add,
  newPetId,
  setVal,
}: Props) => {
  const theme = useContext(ThemeContext);
  const [editable, setEditable] = useState(false);
  const [newImgCloud, setNewImgCloud] = useState('');
  const [checked, setChecked] = useState(
    Pet_Plant?.gender === 'Male' && fieldName === 'gender' ? true : false
  );
  const [checked2, setChecked2] = useState(false);
  const [values, setValues] = useState(
    value === 'Baby'
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
      //console.log(newPetId);
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
        return (
          <Row xs={1} md={2} lg={4} className='g-4'>
            {value.map((petPlant: PetPlant, i: number) => {
              return (
                <PetPlantCard
                  key={'petPlant' + i}
                  PetPlant={petPlant}
                  edit={true}
                  getStars={null}
                />
              );
            })}
          </Row>
        );
      case 'theme':
        return (
          <div>
            <Button
              className='m-2'
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
      case 'breed':
        return (
          Pet_Plant.is_plant === false && (
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
          )
        );
      case 'is_plant':
        return (
          add && (
            <div>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkPet1'
                type='checkbox'
                variant='outline-primary'
                checked={Pet_Plant.is_plant}
                value='1'
                onChange={(e) => {
                  setChecked(e.currentTarget.checked);
                  Pet_Plant.is_plant = true;
                  setVal(true);
                }}
              >
                Yes
              </ToggleButton>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkPet2'
                type='checkbox'
                variant='outline-primary'
                checked={!Pet_Plant.is_plant}
                value='2'
                onChange={(e) => {
                  setChecked2(e.currentTarget.checked);
                  Pet_Plant.is_plant = false;
                  setVal(false);
                }}
              >
                No
              </ToggleButton>
              {/* <Button
                variant='primary'
                onClick={() => {
                  Pet_Plant.is_plant = true;
                  setVal(true);
                }}
              >
                Yes
              </Button> */}
              {/* <Button
                variant='primary'
                onClick={() => {
                  Pet_Plant.is_plant = false;
                  setVal(false);
                }}
              >
                No
              </Button> */}
            </div>
          )
        );
      case 'gender':
        return (
          Pet_Plant.is_plant === false && (
            <div>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkPet1'
                type='checkbox'
                variant='outline-primary'
                checked={checked}
                value='1'
                onChange={(e) => {
                  setChecked(e.currentTarget.checked);
                  setVal('Male');
                }}
              >
                Male
              </ToggleButton>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkPet2'
                type='checkbox'
                variant='outline-primary'
                checked={!checked}
                value='2'
                onChange={(e) => {
                  setChecked(!e.currentTarget.checked);
                  setVal('Female');
                }}
              >
                Female
              </ToggleButton>
            </div>
          )
        );
      case 'species':
        return (
          Pet_Plant.is_plant === false && (
            <div>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkSpecies1'
                type='radio'
                name='radio'
                variant='outline-primary'
                value='1'
                checked={value === 'Cat'}
                onChange={(e) => {
                  setVal('Cat');
                }}
              >
                Cat
              </ToggleButton>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkSpecies2'
                type='radio'
                name='radio'
                checked={value === 'Dog'}
                variant='outline-primary'
                value='2'
                onChange={(e) => {
                  setVal('Dog');
                }}
              >
                Dog
              </ToggleButton>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkSpecies3'
                type='radio'
                name='radio'
                variant='outline-primary'
                checked={value === 'Bird'}
                value='2'
                onChange={(e) => {
                  setVal('Bird');
                }}
              >
                Bird
              </ToggleButton>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkSpecies4'
                type='radio'
                name='radio'
                variant='outline-primary'
                checked={value === 'Fish'}
                value='2'
                onChange={(e) => {
                  setVal('Fish');
                }}
              >
                Fish
              </ToggleButton>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkSpecies5'
                type='radio'
                name='radio'
                variant='outline-primary'
                checked={value === 'Reptile'}
                value='2'
                onChange={(e) => {
                  setVal('Reptile');
                }}
              >
                Reptile
              </ToggleButton>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkSpecies6'
                type='radio'
                name='radio'
                variant='outline-primary'
                checked={value === 'Insect'}
                value='2'
                onChange={(e) => {
                  setVal('Insect');
                }}
              >
                Insect
              </ToggleButton>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkSpecies7'
                type='radio'
                name='radio'
                variant='outline-primary'
                checked={value === 'Rodent'}
                value='2'
                onChange={(e) => {
                  setVal('Rodent');
                }}
              >
                Rodent
              </ToggleButton>
              <ToggleButton
                className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
                id='toggle-checkSpecies8'
                type='radio'
                name='radio'
                variant='outline-primary'
                checked={value === 'Other'}
                value='2'
                onChange={(e) => {
                  setVal('Other');
                }}
              >
                Other
              </ToggleButton>
            </div>
          )
        );
      case 'tags':
        return Pet_Plant.is_plant === false ? (
          <div>
            {petTags.map((tag, i) => {
              return (
                <Tags
                  tag={tag}
                  i={i}
                  key={'tag' + i}
                  setVal={setVal}
                  value={value}
                />
              );
            })}
          </div>
        ) : (
          <div>
            {plantTags.map((tag, i) => {
              return (
                <Tags
                  tag={tag}
                  i={i}
                  key={'tag' + i}
                  setVal={setVal}
                  value={value}
                />
              );
            })}
          </div>
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
                              const lat = position.coords.latitude;
                              const long = position.coords.longitude;
                              axios
                                .get(
                                  `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${process.env.MAPBOX_TOKEN}`
                                )
                                .then((results: any) => {
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
              <RangeSlider
                value={values}
                onChange={(e) => setValues(e.target.value)}
                min={0}
                max={2}
                tooltip='on'
                tooltipPlacement='bottom'
                tooltipLabel={(currentValue) => {
                  if (currentValue === 0) {
                    setVal('Baby');
                    return 'Baby';
                  } else if (currentValue === 1) {
                    setVal('Adult');
                    return 'Adult';
                  } else if (currentValue === 2) {
                    setVal('Senior');
                    return 'Senior';
                  }
                }}
              />
            </div>
          )
        );
      case 'image':
        return (
          <div>
            {value ? (
              <img
                src={value}
                style={{ width: 'auto' }}
                alt='profile picture'
                height='160'
                onClick={() => {
                  showWidget();
                }}
              />
            ) : (
              <Button
                className='bootstrap-button'
                onClick={() => {
                  showWidget();
                }}
              >
                Upload
                <BiUpload style={{ margin: '2px', paddingBottom: '1px' }} />
              </Button>
            )}
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
          : fieldName === 'breed' && Pet_Plant.is_plant === true
          ? ''
          : fieldName === 'species' && Pet_Plant.is_plant === true
          ? ''
          : fieldName === 'is_plant' && !add
          ? ''
          : fieldName === 'is_plant' && add
          ? 'Is this a plant?'
          : fieldName === 'gender' && Pet_Plant.is_plant === true
          ? ''
          : fieldName === 'is_plant' && Pet_Plant.is_plant === true
          ? 'Is this a plant?'
          : fieldName[0].toUpperCase() + fieldName.slice(1)}
      </h2>
      {Pet_Plant?.is_plant && renderSwitch(fieldName)}
      {!Pet_Plant?.is_plant && renderSwitch(fieldName)}
    </Form.Group>
  );
};

export default EditField;
