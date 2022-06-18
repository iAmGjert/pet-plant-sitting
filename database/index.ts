import { GalleryEntryModel } from './models/GalleryEntryModel';
import { UserModel } from './models/UserModel';
import { PetPlantModel } from './models/PetPlantModel';
import { JobModel } from './models/JobModel';
import { EventModel } from './models/EventModel';
import { ConversationModel } from './models/ConversationModel';
import { GalleryModel } from './models/GalleryModel';
import { RatingModel } from './models/RatingModel';
import { PetPlantDescriptorModel } from './models/PetPlantDescriptorModel';
import { JobApplicantModel } from './models/JobApplicantModel';
import { EventParticipantModel } from './models/EventParticipantModel';
import { EventCommentModel } from './models/EventCommentModel';
import { MessageModel } from './models/MessageModel';

const { Sequelize } = require('sequelize');
require('dotenv').config();


const { DB_DATABASE, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_USERNAME } = process.env;
const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

const User = db.define('user', UserModel);
const PetPlant = db.define('pet_plant', PetPlantModel);
const Job = db.define('job', JobModel);
const Events = db.define('event', EventModel);
const Conversation = db.define('conversation', ConversationModel);
const Gallery = db.define('gallery', GalleryModel);
const Rating = db.define('rating', RatingModel);
const PetPlantDescriptor = db.define('pet_plant_descriptor', PetPlantDescriptorModel);
const JobApplicant = db.define('job_applicant', JobApplicantModel);
const EventParticipant = db.define('event_participant', EventParticipantModel);
const EventComment = db.define('event_comment', EventCommentModel);
const Message = db.define('message', MessageModel);
const GalleryEntry = db.define('gallery_entry', GalleryEntryModel);

/************************************************/

User.hasMany(PetPlant, {
  foreignKey: 'owner_id',
});

Job.belongsTo(User, {
  foreignKey: 'employer_id',
});

Job.belongsTo(User, {
  foreignKey: 'sitter_id',
});

Job.hasMany(JobApplicant, {
  foreignKey: 'job_id',
});

JobApplicant.belongsTo(User, {
  foreignKey: 'user_id',
});

Rating.belongsTo(User, {
  foreignKey: 'subject_id',
});

Rating.belongsTo(PetPlant, {
  foreignKey: 'subject_id',
});

Conversation.belongsTo(User, {
  foreignKey: 'participant1_id',
});

Conversation.belongsTo(User, {
  foreignKey: 'participant2_id',
});

Message.belongsTo(Conversation, {
  foreignKey: 'conversation_id',
});

Message.belongsTo(User, {
  foreignKey: 'sender_id',
});

Message.belongsTo(User, {
  foreignKey: 'receiver_id',
});

Events.belongsTo(User, {
  foreignKey: 'host',
});

EventParticipant.belongsTo(User, {
  foreignKey: 'user_id',
});

Events.hasMany(EventParticipant, {
  foreignKey: 'event_id',
});

EventComment.belongsTo(User, {
  foreignKey: 'user_id',
});

Events.hasMany(EventComment, {
  foreignKey: 'event_id',
});

PetPlantDescriptor.belongsTo(PetPlant, {
  foreignKey: 'pet_plant_id',
});

Gallery.hasOne(User, {
  foreignKey: 'gallery_id',
});

Gallery.hasMany(GalleryEntry, {
  foreignKey: 'gallery_id',
});

/************************************************/

db.sync(
  process.env.CLIENT_URL === 'http://localhost'
    ? {force: true}
    : {alter: true}
) //insert {alter: true}(alters tables if necessary) or {force: true}(drops all tables and recreates them every save) if you need to change the db structure
  .then(() => {
    if (process.env.CLIENT_URL === 'http://localhost') {
      User.bulkCreate([
        {
          name: 'Braeden Ford',
          image: 'http://dummyimage.com/233x100.png/dddddd/000000',
          location: '2221 Judith St, Metairie, LA 70003',
          sitter_rating: 10,
          total_sitter_ratings: 24,
          bio: 'Other specified injury of unspecified blood vessel at ankle and foot level, right leg',
          rating: 6,
          total_ratings: 95,
        },
        {
          name: 'Royce Reed',
          image: 'http://dummyimage.com/138x100.png/dddddd/000000',
          location: '6838 Louisville St, New Orleans, LA 70124',
          sitter_rating: 8,
          total_sitter_ratings: 93,
          bio: 'Fall on same level from slipping, tripping and stumbling without subsequent striking against object',
          rating: 7,
          total_ratings: 83,
        },
        {
          name: 'Eric Gjertsen',
          image: 'http://dummyimage.com/142x100.png/cc0000/ffffff',
          location: '2705 A P Tureaud Ave, New Orleans, LA 70119',
          sitter_rating: 8,
          total_sitter_ratings: 88,
          bio: 'Laceration without foreign body, left knee, sequela',
          rating: 1,
          total_ratings: 18,
        },
        {
          name: 'Iben Oneal',
          image: 'http://dummyimage.com/249x100.png/5fa2dd/ffffff',
          location: '4609 Banks St, New Orleans, LA 70119',
          sitter_rating: 4,
          total_sitter_ratings: 38,
          bio: 'Nondisplaced bicondylar fracture of left tibia',
          rating: 7,
          total_ratings: 93,
        },
        {
          name: 'Raymond Jeong',
          image: 'http://dummyimage.com/124x100.png/5fa2dd/ffffff',
          location: '1213 Gaudet Dr, Marrero, LA 70072',
          sitter_rating: 3,
          total_sitter_ratings: 86,
          bio: 'Major laceration of right vertebral artery, initial encounter',
          rating: 4,
          total_ratings: 70,
        },
        {
          name: 'velouriagreen',
          image: 'http://dummyimage.com/124x100.png/5fa2dd/ffffff',
          location: '1213 Gaudet Dr, Marrero, LA 70072',
          sitter_rating: 3,
          total_sitter_ratings: 86,
          bio: 'Major laceration of right vertebral artery, initial encounter',
          rating: 4,
          total_ratings: 70,
        },
      ])
        .then(() => {
          PetPlant.bulkCreate([
            {
              owner_id: 1,
              name: 'Loïc',
              image: 'http://dummyimage.com/153x100.png/5fa2dd/ffffff',
              breed: 'Madagascar hawk owl',
              species: 'Ninox superciliaris',
              tags: ['Khaki', 'Violet'],
              rating: 9,
              total_ratings: 33,
              is_plant: false,
            },
            {
              owner_id: 2,
              name: 'Laïla',
              image: 'http://dummyimage.com/213x100.png/5fa2dd/ffffff',
              breed: 'Skink, blue-tongued',
              species: 'Tiliqua scincoides',
              tags: ['Khaki', 'Goldenrod'],
              rating: 8,
              total_ratings: 96,
              is_plant: false,
            },
            {
              owner_id: 3,
              name: 'Angélique',
              image: 'http://dummyimage.com/210x100.png/ff4444/ffffff',
              breed: 'Small-clawed otter',
              species: 'Aonyx cinerea',
              tags: ['Crimson', 'Violet'],
              rating: 5,
              total_ratings: 71,
              is_plant: true,
            },
            {
              owner_id: 4,
              name: 'Bénédicte',
              image: 'http://dummyimage.com/135x100.png/5fa2dd/ffffff',
              breed: 'Prairie falcon',
              species: 'Falco mexicanus',
              tags: ['Maroon', 'Khaki'],
              rating: 4,
              total_ratings: 92,
              is_plant: true,
            },
            {
              owner_id: 5,
              name: 'Dù',
              image: 'http://dummyimage.com/244x100.png/5fa2dd/ffffff',
              breed: 'Long-tailed skua',
              species: 'Stercorarius longicausus',
              tags: ['Turquoise', 'Khaki'],
              rating: 9,
              total_ratings: 60,
              is_plant: false,
            },
          ]);
        })
        .then(() => {
          Job.bulkCreate([
            {
              location: '2221 Judith St, Metairie, LA 70003',
              pet_plant: [2, 2],
              employer_id: 1,
              sitter_id: 6,
              startDate: new Date('July 11, 2022 01:15:00'),
              endDate: new Date('July 15, 2022 01:15:00'),
            },
            {
              location: '6838 Louisville St, New Orleans, LA 70124',
              pet_plant: [5, 2],
              employer_id: 2,
              sitter_id: 6,
              startDate: new Date('July 22, 2022 01:15:00'),
              endDate: new Date('July 27, 2022 01:15:00'),
            },
            {
              location: '2705 A P Tureaud Ave, New Orleans, LA 70119',
              pet_plant: [5, 1],
              employer_id: 3,
              sitter_id: 6,
              startDate: new Date('July 20, 2022 01:15:00'),
              endDate: new Date('July 25, 2022 01:15:00'),
            },
            {
              location: '4609 Banks St, New Orleans, LA 70119',
              pet_plant: [3, 1],
              employer_id: 4,
              sitter_id: 6,
              startDate: new Date('July 21, 2022 01:15:00'),
              endDate: new Date('July 25, 2022 01:15:00'),
            },
            {
              location: '1213 Gaudet Dr, Marrero, LA 70072',
              pet_plant: [3, 1],
              employer_id: 5,
              sitter_id: 6,
              startDate: new Date('July 1, 2022 01:15:00'),
              endDate: new Date('July 5, 2022 01:15:00'),
            },
          ]);
        }).then(() => {
          Events.bulkCreate([
            {
              name: 'Dog Park Meetup',
              host: 1,
              location: '810 Euterpe St New Orleans, Louisiana, 70130',
              description: 'maecenas ut massa quis augue luctus tincidunt nulla mollis',
              startDate: new Date('July 5, 2022 01:15:00'),
              startTime: '3:19 AM',
            },
            {
              name: 'Annual Animal Rescue Drive',
              host: 2,
              location: '8639 Plum St New Orleans, Louisiana, 70118',
              description: 'ante ipsum primis in faucibus',
              startDate: new Date('July 5, 2022 01:15:00'),
              startTime: '4:48 AM',
            },
            {
              name: 'Barkus Parade',
              host: 3,
              location: '6821 Mayo Blvd New Orleans, Louisiana, 70126',
              description: 'non ligula pellentesque ultrices phasellus id sapien in sapien iaculis',
              startDate: new Date('July 5, 2022 01:15:00'),
              startTime: '5:59 PM',
            },
            {
              name: 'Post Disaster Food Drive for our Furry Friends',
              host: 4,
              location: '862 S Clearview Pky New Orleans, Louisiana, 70123',
              description: 'integer ac leo pellentesque ultrices',
              startDate: new Date('July 5, 2022 01:15:00'),
              startTime: '12:20 AM',
            },
            {
              name: 'blandit lacinia erat vestibulum sed',
              host: 5,
              location: '8912 Bunker Hill Rd New Orleans, Louisiana, 70127',
              description: 'consequat varius integer ac leo pellentesque ultrices mattis odio donec',
              startDate: new Date('July 5, 2022 01:15:00'),
              startTime: '4:33 PM',
            },
          ]).then(() => {
            EventComment.bulkCreate([
              {
                id: 1,
                event_id: 1,
                comment:
                  'nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante',
                user_id: 1,
              },
              {
                id: 2,
                event_id: 2,
                comment: 'orci vehicula',
                user_id: 2,
              },
              {
                id: 3,
                event_id: 3,
                comment: 'erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin',
                user_id: 3,
              },
              {
                id: 4,
                event_id: 4,
                comment:
                  'non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu',
                user_id: 4,
              },
              {
                id: 5,
                event_id: 5,
                comment: 'fusce consequat nulla nisl nunc nisl duis',
                user_id: 5,
              },
            ]);
          })
            .then(() => {
              EventParticipant.bulkCreate([
                {
                  id: 1,
                  event_id: 1,
                  user_id: 1,
                },
                {
                  id: 2,
                  event_id: 2,
                  user_id: 2,
                },
                {
                  id: 3,
                  event_id: 3,
                  user_id: 3,
                },
                {
                  id: 4,
                  event_id: 4,
                  user_id: 4,
                },
              ]);
            });
        });

    }
  })
  
  .then(() =>
    console.log(
      process.env.CLIENT_URL === 'http://localhost'
        ? '🐘 Models synced and 🌱 seeded!'
        : '🐘 Models synced!'
    )
  )
  .catch((err: string) => console.error(err));

export {
  db,
  User,
  Conversation,
  Gallery,
  GalleryEntry,
  Message,
  EventComment,
  EventParticipant,
  JobApplicant,
  PetPlantDescriptor,
  Rating,
  Events,
  Job,
  PetPlant,
};
