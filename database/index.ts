/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize('fern-herm', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

//IF YOU NEED TO UPDATE THE DB, insert {alter: true} into .sync() on line 198

const User = db.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 

  name: DataTypes.STRING,
  image: DataTypes.STRING,
  location: DataTypes.STRING,
  sitter_rating: DataTypes.FLOAT,
  total_sitter_ratings: DataTypes.INTEGER,
  bio: DataTypes.STRING,
  rating: { type: DataTypes.FLOAT, defaultValue: 5 },
  total_ratings: DataTypes.INTEGER,
  gallery_id: DataTypes.INTEGER
});

const PetPlant = db.define('pet_plant', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  owner_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  breed: DataTypes.STRING,
  species: DataTypes.STRING,
  tags: DataTypes.ARRAY(DataTypes.STRING),
  rating: DataTypes.FLOAT,
  total_ratings: DataTypes.INTEGER,
  is_plant: DataTypes.BOOLEAN
});

const Job = db.define('job', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  pet_plant: DataTypes.ARRAY(DataTypes.INTEGER),
  employer_id: DataTypes.INTEGER,
  sitter_id: DataTypes.INTEGER,
  applicants: DataTypes.ARRAY(DataTypes.INTEGER),
});

const Events = db.define('event', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  name: DataTypes.STRING,
  host: DataTypes.STRING,
  location: DataTypes.STRING,
  description: DataTypes.STRING,
  users_signed_up: DataTypes.INTEGER
});

const Conversation = db.define('conversation', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  name: DataTypes.STRING,
  participant1_id: DataTypes.INTEGER,
  participant2_id: DataTypes.INTEGER
});

const Gallery = db.define('gallery', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  user_id: DataTypes.INTEGER,
});

const Rating = db.define('rating', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  subject_id: DataTypes.INTEGER,
  value: DataTypes.INTEGER
});

const PetPlantDescriptor = db.define('pet_plant_descriptor', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  descriptor: DataTypes.STRING,
  pet_plant_id: DataTypes.INTEGER,
});

const JobApplicant = db.define('job_applicant', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  user_id: DataTypes.INTEGER,
  job_id: DataTypes.INTEGER
});

const EventParticipant = db.define('event_participant', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  event_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER, 
});

const EventComment = db.define('event_comment', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  event_id: DataTypes.INTEGER,
  comment: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
});

const Message = db.define('message', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  name: DataTypes.STRING,
  sender_id: DataTypes.INTEGER,
  receiver_id: DataTypes.INTEGER,
  conversation_id: DataTypes.INTEGER,
  text: DataTypes.STRING,
});

const GalleryEntry = db.define('gallery_entry', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  url: DataTypes.STRING,
  gallery_id: DataTypes.INTEGER
});


//************************************************** */

                
//*associations

//********************************************** */


db
  .sync() //insert {alter: true}(alters tables if necessary) or {force: true}(drops all tables and recreates them every save) if you need to change the db structure
  .then(() => console.log('Models synced!', 'ln125'))
  .catch((err: string) => console.error(err));

export { db, User, Conversation, Gallery, GalleryEntry, Message, EventComment, EventParticipant, JobApplicant, PetPlantDescriptor, Rating, Events, Job, PetPlant };
