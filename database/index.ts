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
import { JobPetsPlantsModel } from './models/JobPetsPlantsModel';

const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_DATABASE, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_USERNAME } =
  process.env;
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
const Messages = db.define('message', MessageModel);
const GalleryEntry = db.define('gallery_entry', GalleryEntryModel);
const JobPetsPlants = db.define('job_pets_plants', JobPetsPlantsModel);

/************************************************/

User.hasMany(PetPlant, {
  foreignKey: 'owner_id',
});

Job.belongsTo(User, {
  foreignKey: 'employer_id',
});

Job.belongsTo(User, {
  foreignKey: 'sitter_id',
  as: 'sitter',
});

Job.hasMany(JobApplicant, {
  foreignKey: 'job_id',
});

JobApplicant.belongsTo(Job, {
  foreignKey: 'job_id',
});

JobApplicant.belongsTo(User, {
  foreignKey: 'user_id',
});

Job.hasMany(JobPetsPlants, {
  foreignKey: 'job_id',
});

JobPetsPlants.belongsTo(PetPlant, {
  foreignKey: 'pet_plant_id',
});

User.hasMany(Rating, {
  foreignKey: 'user_id',
});

PetPlant.hasMany(Rating, {
  foreignKey: 'petplant_id',
});

Rating.belongsTo(User, {
  foreignKey: 'submitter_id',
  as: 'submitter',
});

Conversation.belongsTo(User, {
  foreignKey: 'participant1_id',
});

Conversation.belongsTo(User, {
  foreignKey: 'participant2_id',
});

Messages.belongsTo(Conversation, {
  foreignKey: 'conversation_id',
});

Messages.belongsTo(User, {
  foreignKey: 'sender_id',
});

Messages.belongsTo(User, {
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

User.hasOne(Gallery, {
  foreignKey: 'id',
});

// Gallery.hasOne(User, {
//   foreignKey: 'user_id',
// });

User.belongsTo(Gallery, {
  foreignKey: 'id',
});

Gallery.hasMany(GalleryEntry, {
  foreignKey: 'gallery_id',
});

/************************************************/

db.sync(
  process.env.CLIENT_URL === 'http://localhost'
    ? { force: true }
    : { alter: true }
) //insert {alter: true}(alters tables if necessary) or {force: true}(drops all tables and recreates them every save) if you need to change the db structure
  .then(() => {
    if (process.env.CLIENT_URL === 'http://localhost') {
      User.bulkCreate([
        {
          name: 'Iben Oneal',
          image:
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F09%2F04%2FBeyonce-1.jpg',
          location: '',
          sitter_rating: 10,
          total_sitter_ratings: 24,
          bio: ``,
          average_rating: 5,
          total_ratings: 95,
        },
        {
          name: 'Braeden Ford',
          image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVKs06QLIdwr5m5iIjxvDitADflWB1gjJCWg&usqp=CAU',
          location: '1500 Sugar Bowl Dr, New Orleans, LA 70112',
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
          name: 'Caity',
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
          location: '1213 Elysian Fields Ave, New Orleans, LA 70117',
          sitter_rating: 3,
          total_sitter_ratings: 86,
          bio: 'Major laceration of right vertebral artery, initial encounter',
          rating: 4,
          total_ratings: 70,
        },
      ]).then(() => {
        PetPlant.bulkCreate([
          {
            owner_id: 1,
            name: 'Santi',
            image:
              'https://64.media.tumblr.com/ac3f2698510ef384fdb04620750b228e/25d400665ce53341-ef/s500x750/58c0307cb0fed6a450b04ec559e8a67d99984fbf.jpg',
            breed: 'canine',
            species: 'snorkie',
            tags: ['Khaki', 'Violet'],
            rating: 9,
            total_ratings: 33,
            is_plant: false,
            bio: 'I\'m very shy, but if you feed me then I instantly become your best friend',
          },
          {
            owner_id: 2,
            name: 'Nova',
            image:
              'https://res.cloudinary.com/bford002/image/upload/v1654528525/8B69B1F7-0B39-4F3F-BF45-D0EB0FA186B2_qjl237.jpg',
            breed: 'Skink, blue-tongued',
            species: 'Tiliqua scincoides',
            tags: ['Khaki', 'Goldenrod'],
            rating: 8,
            total_ratings: 96,
            is_plant: false,
            bio: 'I am the world\'s worst demon child. I like sleeping in toilets, so be sure to leave it open for me. And no, the cat did not write this',
          },
          {
            owner_id: 3,
            name: 'Audrey II',
            image:
              'https://dafb3cv85j5xj.cloudfront.net/blog/wp-content/uploads/2016/09/audreyII_feat.jpg',
            breed: 'Venus Fly Trap Mix',
            species: 'Butterwort',
            tags: ['Crimson', 'Violet'],
            rating: 5,
            total_ratings: 71,
            is_plant: true,
            bio: 'Forget the water! I feed human blood.',
          },
          {
            owner_id: 4,
            name: 'Bénédicte',
            image:
              'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/plant-names-1650565348.jpg?resize=480:*',
            breed: 'Shy Cacti',
            species: 'Succulent',
            tags: ['Maroon', 'Khaki'],
            rating: 4,
            total_ratings: 92,
            is_plant: true,
            bio: 'Thrives on neglect! Just like Sam',
          },
          {
            owner_id: 5,
            name: 'Benito',
            image:
              'https://i.pinimg.com/564x/f9/cb/ac/f9cbac7622150fa28306a16dde13bb25.jpg',
            breed: 'Long-tailed feline',
            species: 'feline',
            tags: ['Turquoise', 'Khaki'],
            rating: 9,
            total_ratings: 60,
            is_plant: false,
            bio: 'I used to belong to the streets. Now I sleep at my human\'s feets!',
          },
          {
            owner_id: 4,
            name: 'Loïc',
            image:
              'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
            breed: 'Madagascar hawk owl',
            age: 2,
            gender: 'Male',
            species: 'Ninox superciliaris',
            tags: ['Khaki', 'Violet', 'Speed', 'Cute'],
            rating: 4,
            total_ratings: 33,
            is_plant: false,
            bio: 'I used to belong to the streets. Now I sleep at my human\'s feets!',
          },
          {
            owner_id: 7,
            name: 'Benito',
            image:
              'https://i.pinimg.com/564x/f9/cb/ac/f9cbac7622150fa28306a16dde13bb25.jpg',
            breed: 'Long-tailed feline',
            species: 'feline',
            tags: ['Turquoise', 'Khaki'],
            rating: 9,
            total_ratings: 60,
            is_plant: false,
            bio: 'I used to belong to the streets. Now I sleep at my human\'s feets!',
          },
          {
            owner_id: 4,
            name: 'Rex',
            image:
              'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
            breed: 'Dalmation',
            age: 2,
            gender: 'Male',
            species: 'Dog',
            tags: ['Spotted', 'Silly', 'Speed', 'Cute'],
            rating: 4,
            total_ratings: 33,
            is_plant: false,
            bio: 'Ain\'t I cute?!',
          },
        ]).then(() => {
          Rating.bulkCreate([
            {
              user_id: 1,
              value: 5,
              text: 'What a beautiful choclate man!',
              submitter_id: 3,
            },
            {
              petplant_id: 1,
              value: 2,
              submitter_id: 4,
            },
            {
              user_id: 1,
              value: 2,
              text: 'My dogs said he was too cool 👎🏾',
              submitter_id: 5,
            },
            {
              user_id: 4,
              value: 4,
              text: 'Wurd to my momma',
              submitter_id: 4,
            },
            {
              petplant_id: 1,
              value: 1,
              text: 'I love this dog',
              submitter_id: 3,
            },
            {
              petplant_id: 1,
              value: 2,
              text: 'Best Pupper',
              submitter_id: 2,
            },
          ]).then(() => {
            Job.bulkCreate([
              {
                location: '1213 Elysian Fields Ave, New Orleans, LA 70117',
                pet_plant: [2, 2],
                employer_id: 2,
                description: 'Come watch my child!',
                sitter_id: 7,
                startDate: new Date('June 1, 2022 01:15:00'),
                endDate: new Date('June 13, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: '6838 Louisville St, New Orleans, LA 70124',
                pet_plant: [5, 2],
                employer_id: 3,
                description: 'Come watch this little devil',
                sitter_id: null,
                startDate: new Date('June 7, 2022 01:15:00'),
                endDate: new Date('June 14, 2022 01:15:00'),
                isCompleted: true
              },
              {
                location: '2705 A P Tureaud Ave, New Orleans, LA 70119',
                pet_plant: [3],
                employer_id: 3,
                sitter_id: 5,
                description: 'Come watch this things',
                startDate: new Date('July 1, 2022 01:15:00'),
                endDate: new Date('July 3, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: '4609 Banks St, New Orleans, LA 70119',
                pet_plant: [3, 1],
                employer_id: 5,
                description: 'Come watch my child!',
                sitter_id: 6,
                startDate: new Date('July 15, 2022 01:15:00'),
                endDate: new Date('July 20, 2022 01:15:00'),
                isCompleted: true
              },
              {
                location: '1213 Gaudet Dr, Marrero, LA 70072',
                description: 'You\'re a bio!',
                pet_plant: [3, 1],
                employer_id: 6,
                sitter_id: 7,
                startDate: new Date('June 29, 2022 01:15:00'),
                endDate: new Date('July 29, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: '1600 Frankel Ave, Metairie, LA 70003',
                pet_plant: [1, 2],
                employer_id: 7,
                description: 'Test Job Description!',
                sitter_id: null,
                startDate: new Date('June 1, 2022 01:15:00'),
                endDate: new Date('July 2, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: '1605 Frankel Ave, Metairie, LA 70003',
                pet_plant: [1, 2],
                employer_id: 1,
                description: 'Test Job Description 2!',
                sitter_id: null,
                startDate: new Date('July 1, 2022 01:15:00'),
                endDate: new Date('June 3, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: '1610 Frankel Ave, Metairie, LA 70003',
                pet_plant: [3, 4],
                employer_id: 5,
                description: 'Test Job Description 3!',
                sitter_id: null,
                startDate: new Date('June 27, 2022 01:15:00'),
                endDate: new Date('July 5, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: '1221 S Clearview',
                pet_plant: [1, 4],
                employer_id: 1,
                description: 'Test Job Description 4!',
                sitter_id: null,
                startDate: new Date('August 30, 2022 01:15:00'),
                endDate: new Date('September 4, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: '3707 Derbigny St',
                pet_plant: [6, 4],
                employer_id: 4,
                description: 'Test Job Description 5!',
                sitter_id: null,
                startDate: new Date('August 30, 2022 01:15:00'),
                endDate: new Date('September 4, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: '4245 Connecticut Ave, Kenner, LA 70065',
                pet_plant: [8, 6],
                employer_id: 4,
                description: 'Test Job Description 6!',
                sitter_id: null,
                startDate: new Date('August 30, 2022 01:15:00'),
                endDate: new Date('September 4, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: 'Superdome New Orleans',
                pet_plant: [8, 6],
                employer_id: 4,
                description: 'Test Job Description 6!',
                sitter_id: null,
                startDate: new Date('August 30, 2022 01:15:00'),
                endDate: new Date('September 4, 2022 01:15:00'),
                isCompleted: false
              },
              {
                location: '1213 Gaudet Dr, Marrero, LA 70072',
                pet_plant: [1, 2],
                employer_id: 6,
                description: 'Hello, my name is Raymond. Please come watch my things while I code!!',
                sitter_id: null,
                startDate: new Date('June 25, 2022 01:15:00'),
                endDate: new Date('September 4, 2022 01:15:00'),
                isCompleted: false
              },
            ]).then(() => {
              Events.bulkCreate([
                {
                  name: 'Dog Park Meetup',
                  host: 1,
                  location: '10 Magnolia Dr, New Orleans, LA 70124',
                  description:
                    'Maybe you like to hike or camp with your dog, but are not sure of which are pet safe and dog-friendly trails and sites. Or, maybe you would just like to meet other doggy parents and give yourself and your dog a chance to simply socialize.',
                  startDate: new Date('July 5, 2022 01:15:00'),
                  startTime: '3:19 AM',
                },
                {
                  name: 'Annual Animal Rescue Drive',
                  host: 2,
                  location: '8639 Plum St New Orleans, Louisiana, 70118',
                  description:
                    'A gathering for pet-less humans to find and be rescued by their furrever friends',
                  startDate: new Date('June 29, 2022 01:15:00'),
                  startTime: '4:48 AM',
                },
                {
                  name: 'Barkus Parade',
                  host: 3,
                  location: '6821 Mayo Blvd New Orleans, Louisiana, 70126',
                  description:
                    'The Mystic Krewe of Barkus is a New Orleans Mardi Gras parade where participants are dogs costumed',
                  startDate: new Date('June 30, 2022 01:15:00'),
                  startTime: '5:59 PM',
                },
                {
                  name: 'Post Disaster Food Drive for our Reptile Friends',
                  host: 4,
                  location: '862 S Clearview Pky New Orleans, Louisiana, 70123',
                  description:
                    'Reptiles are our friends, not overlords! Please join in destigmatizing the taboo surrounding our cold-blooded friends. Free mice available upon request',
                  startDate: new Date('July 5, 2022 01:15:00'),
                  startTime: '12:20 AM',
                },
                {
                  name: 'Demanding Plant Workshop',
                  host: 5,
                  location: '8912 Bunker Hill Rd New Orleans, Louisiana, 70127',
                  description:
                    'A gathering for green-thumbed humans to impart their plant-care wisdom for those high-maintentance plants you just had to buy, Linda',
                  startDate: new Date('July 5, 2022 01:15:00'),
                  startTime: '4:33 PM',
                },
                
              ])
                .then(() => {
                  EventComment.bulkCreate([
                    {
                      // id: 1,
                      event_id: 1,
                      comment:
                        'Spicy jalapeno bacon ipsum dolor amet ball tip ham hock burgdoggen, chislic porchetta ribeye cupim boudin drumstick shoulder chuck biltong.',
                      user_id: 1,
                    },
                    {
                      // id: 2,
                      event_id: 1,
                      comment:
                        'Short ribs beef ribs bresaola, ball tip kielbasa cow ribeye chicken turducken ground round short loin meatloaf porchetta venison.',
                      user_id: 2,
                    },
                    {
                      // id: 3,
                      event_id: 1,
                      comment:
                        'erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin',
                      user_id: 3,
                    },
                    {
                      // id: 4,
                      event_id: 1,
                      comment:
                        'non lectus aliquam sit amet diam in mGround round tongue pancetta frankfurter drumstick, bresaola chicken boudin cupim burgdoggen.',
                      user_id: 4,
                    },
                    {
                      // id: 5,
                      event_id: 1,
                      comment: 'fusce consequat nulla nisl nunc nisl duis',
                      user_id: 5,
                    },
                    {
                      // id: 6,
                      event_id: 1,
                      comment: 'Ham hock tenderloin turkey hamburger',
                      user_id: 1,
                    },
                  ]);
                })
                .then(() => {
                  EventParticipant.bulkCreate([
                    {
                      // id: 1,
                      event_id: 1,
                      user_id: 1,
                    },
                    {
                      // id: 2,
                      event_id: 2,
                      user_id: 2,
                    },
                    {
                      // id: 3,
                      event_id: 3,
                      user_id: 3,
                    },
                    {
                      // id: 4,
                      event_id: 4,
                      user_id: 4,
                    },
                  ]);
                })
                .then(() => {
                  JobApplicant.bulkCreate([
                    {
                      user_id: 1,
                      job_id: 1,
                      status: 'approved'
                    },
                    {
                      user_id: 7,
                      job_id: 1,
                      status: 'rejected'
                    },
                    {
                      user_id: 7,
                      job_id: 3,
                      status: 'pending'
                    },
                    {
                      user_id: 7,
                      job_id: 4,
                      status: 'approved'
                    },
                    {
                      user_id: 7,
                      job_id: 5,
                      status: 'pending'
                    },
                    {
                      user_id: 7,
                      job_id: 10,
                      status: 'pending'
                    },
                    {
                      user_id: 1,
                      job_id: 10,
                      status: 'pending'
                    },
                    {
                      user_id: 2,
                      job_id: 10,
                      status: 'pending'
                    },
                    {
                      user_id: 1,
                      job_id: 11,
                      status: 'pending'
                    },
                    {
                      user_id: 2,
                      job_id: 11,
                      status: 'pending'
                    },
                    {
                      user_id: 3,
                      job_id: 11,
                      status: 'pending'
                    },
                    {
                      user_id: 5,
                      job_id: 11,
                      status: 'pending'
                    },
                    {
                      user_id: 6,
                      job_id: 11,
                      status: 'pending'
                    },
                    {
                      user_id: 7,
                      job_id: 11,
                      status: 'pending'
                    },
                  ]);
                })
                .then(()=>{
                  JobPetsPlants.bulkCreate([
                    {
                      job_id: 1,
                      pet_plant_id: 2
                    },
                    {
                      job_id: 1,
                      pet_plant_id: 3
                    },
                    {
                      job_id: 2,
                      pet_plant_id: 1
                    },
                    {
                      job_id: 2,
                      pet_plant_id: 4
                    },
                    {
                      job_id: 3,
                      pet_plant_id: 1
                    },
                    {
                      job_id: 3,
                      pet_plant_id: 2
                    },
                    {
                      job_id: 4,
                      pet_plant_id: 3
                    },
                    {
                      job_id: 4,
                      pet_plant_id: 5
                    },
                    {
                      job_id: 5,
                      pet_plant_id: 5
                    },
                    {
                      job_id: 5,
                      pet_plant_id: 4
                    },
                  ]);
                })
                .catch((err: Error) => console.log(err));
            });
          });
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
  Messages,
  EventComment,
  EventParticipant,
  JobApplicant,
  PetPlantDescriptor,
  Rating,
  Events,
  Job,
  PetPlant,
  JobPetsPlants,
};
