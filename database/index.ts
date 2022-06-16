/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const {DB_DATABASE, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_USERNAME} = process.env;
const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
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
  average_rating: { type: DataTypes.FLOAT, defaultValue: 5 },
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
  location: DataTypes.STRING,
  pet_plant: DataTypes.ARRAY(DataTypes.INTEGER),
  employer_id: DataTypes.INTEGER,
  sitter_id: DataTypes.INTEGER,
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY
});

const Events = db.define('event', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
  name: DataTypes.STRING,
  host: DataTypes.INTEGER,
  location: DataTypes.STRING,
  description: DataTypes.STRING,
  participants: DataTypes.ARRAY(DataTypes.INTEGER),
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY,
  startTime: DataTypes.TIME
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


/************************************************/

User.hasMany(PetPlant, {
  foreignKey: 'owner_id'
});

Job.belongsTo(User, {
  foreignKey: 'employer_id'
});

Job.belongsTo(User, {
  foreignKey: 'sitter_id'
});

Job.hasMany(JobApplicant, {
  foreignKey: 'job_id'
});

JobApplicant.belongsTo(User, {
  foreignKey: 'user_id'
});

Rating.belongsTo(User, {
  foreignKey: 'subject_id'
});

Rating.belongsTo(PetPlant, {
  foreignKey: 'subject_id'
});

Conversation.belongsTo(User, {
  foreignKey: 'participant1_id'
});

Conversation.belongsTo(User, {
  foreignKey: 'participant2_id'
});

Message.belongsTo(Conversation, {
  foreignKey: 'conversation_id'
});

Message.belongsTo(User, {
  foreignKey: 'sender_id'
});

Message.belongsTo(User, {
  foreignKey: 'receiver_id'
});

Events.belongsTo(User, {
  foreignKey: 'host'
});

EventParticipant.belongsTo(User, {
  foreignKey: 'user_id'
});

Events.hasMany(EventParticipant, {
  foreignKey: 'event_id'
});

EventComment.belongsTo(User, {
  foreignKey: 'user_id'
});

EventComment.belongsTo(Events, {
  foreignKey: 'event_id'
});

PetPlantDescriptor.belongsTo(PetPlant, {
  foreignKey: 'pet_plant_id'
});

Gallery.hasOne(User, {
  foreignKey: 'gallery_id'
});

Gallery.hasMany(GalleryEntry, {
  foreignKey: 'gallery_id'
});

/************************************************/


db
  .sync(process.env.CLIENT_URL === 'http://localhost' ? {
    force: true
  } : { alter: true }) //insert {alter: true}(alters tables if necessary) or {force: true}(drops all tables and recreates them every save) if you need to change the db structure
  .then(()=>{
    if (process.env.CLIENT_URL === 'http://localhost') {
      User.bulkCreate([
        {
          'name': 'Lib Phin',
          'image': 'http://dummyimage.com/233x100.png/dddddd/000000',
          'location': '978 Utah Street',
          'sitter_rating': 10,
          'total_sitter_ratings': 24,
          'bio': 'Other specified injury of unspecified blood vessel at ankle and foot level, right leg',
          'rating': 6,
          'total_ratings': 95
        },
        
        {
          'name': 'Beverley Ailward',
          'image': 'http://dummyimage.com/138x100.png/dddddd/000000',
          'location': '828 Acker Road',
          'sitter_rating': 8,
          'total_sitter_ratings': 93,
          'bio': 'Fall on same level from slipping, tripping and stumbling without subsequent striking against object',
          'rating': 7,
          'total_ratings': 83
        },
        {
          'name': 'Nevil Sutcliffe',
          'image': 'http://dummyimage.com/142x100.png/cc0000/ffffff',
          'location': '2407 Hazelcrest Avenue',
          'sitter_rating': 8,
          'total_sitter_ratings': 88,
          'bio': 'Laceration without foreign body, left knee, sequela',
          'rating': 1,
          'total_ratings': 18
        },
        {
          'name': 'Bradley Wilkison',
          'image': 'http://dummyimage.com/249x100.png/5fa2dd/ffffff',
          'location': '02 Carpenter Park', 'sitter_rating': 4,
          'total_sitter_ratings': 38,
          'bio': 'Nondisplaced bicondylar fracture of left tibia',
          'rating': 7,
          'total_ratings': 93
        },
        {
          'name': 'Ramonda Sheavills',
          'image': 'http://dummyimage.com/124x100.png/5fa2dd/ffffff',
          'location': '5337 Melody Junction',
          'sitter_rating': 3,
          'total_sitter_ratings': 86,
          'bio': 'Major laceration of right vertebral artery, initial encounter',
          'rating': 4,
          'total_ratings': 70
        }
      ])
        .then(()=>{
          PetPlant.bulkCreate([{
            'owner_id': 1,
            'name': 'Loïc',
            'image': 'http://dummyimage.com/153x100.png/5fa2dd/ffffff',
            'breed': 'Madagascar hawk owl',
            'species': 'Ninox superciliaris',
            'tags': ['Khaki', 'Violet'],
            'rating': 9,
            'total_ratings': 33,
            'is_plant': false
          },
          {
            'owner_id': 2,
            'name': 'Laïla',
            'image': 'http://dummyimage.com/213x100.png/5fa2dd/ffffff',
            'breed': 'Skink, blue-tongued',
            'species': 'Tiliqua scincoides',
            'tags': ['Khaki', 'Goldenrod'],
            'rating': 8,
            'total_ratings': 96,
            'is_plant': false
          },
          {
            'owner_id': 3,
            'name': 'Angélique',
            'image': 'http://dummyimage.com/210x100.png/ff4444/ffffff',
            'breed': 'Small-clawed otter',
            'species': 'Aonyx cinerea',
            'tags': ['Crimson', 'Violet'],
            'rating': 5,
            'total_ratings': 71,
            'is_plant': true
          },
          {
            'owner_id': 4,
            'name': 'Bénédicte',
            'image': 'http://dummyimage.com/135x100.png/5fa2dd/ffffff',
            'breed': 'Prairie falcon',
            'species': 'Falco mexicanus',
            'tags': ['Maroon', 'Khaki'],
            'rating': 4,
            'total_ratings': 92,
            'is_plant': true
          },
          {
            'owner_id': 5,
            'name': 'Dù',
            'image': 'http://dummyimage.com/244x100.png/5fa2dd/ffffff',
            'breed': 'Long-tailed skua',
            'species': 'Stercorarius longicausus',
            'tags': ['Turquoise', 'Khaki'],
            'rating': 9,
            'total_ratings': 60,
            'is_plant': false
          }]);
        })
        .then(()=>{
          Job.bulkCreate([{
            'location': '64 Leroy Lane',
            'pet_plant': [2, 2],
            'employer_id': 1,
            'startDate': new Date('July 11, 2022 01:15:00'),
            'endDate': new Date('July 15, 2022 01:15:00')
          },
          {
            'location': '6107 Green Ridge Avenue',
            'pet_plant': [5, 2],
            'employer_id': 1,
            'startDate': new Date('July 22, 2022 01:15:00'),
            'endDate': new Date('July 27, 2022 01:15:00')
          },
          {
            'location': '9 Tomscot Park',
            'pet_plant': [5, 1],
            'employer_id': 1,
            'startDate': new Date('July 20, 2022 01:15:00'),
            'endDate': new Date('July 25, 2022 01:15:00')
          },
          {
            'location': '4780 Fair Oaks Park',
            'pet_plant': [3, 1],
            'employer_id': 1,
            'startDate': new Date('July 21, 2022 01:15:00'),
            'endDate': new Date('July 25, 2022 01:15:00')
          },
          {
            'location': '43 Fairview Crossing',
            'pet_plant': [3, 1],
            'employer_id': 1,
            'startDate': new Date('July 1, 2022 01:15:00'),
            'endDate': new Date('July 5, 2022 01:15:00')
          }]);
        });
    }
  })
  .then(() => console.log(process.env.CLIENT_URL === 'http://localhost' ? '🐘 Models synced and seeded!' : '🐘 Models synced!'))
  .catch((err: string) => console.error(err));

export { db, User, Conversation, Gallery, GalleryEntry, Message, EventComment, EventParticipant, JobApplicant, PetPlantDescriptor, Rating, Events, Job, PetPlant };
