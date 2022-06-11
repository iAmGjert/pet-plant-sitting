CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "image" varchar,
  "location" varchar,
  "sitter_rating" int,
  "total_sitter_ratings" int,
  "bio" varchar,
  "rating" int,
  "total_ratings" int,
  "gallery_id" int,
  "created_at" timestamp
);

CREATE TABLE "pet_plant" (
  "id" SERIAL PRIMARY KEY,
  "owner_id" int,
  "name" varchar,
  "image" varchar,
  "breed" varchar,
  "species" varchar,
  "tags" varchar,
  "rating" int,
  "total_ratings" int,
  "is_plant" boolean,
  "created_at" timestamp
);

CREATE TABLE "event" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "host" varchar,
  "location" varchar,
  "description" varchar,
  "users_signed_up" int,
  "created_at" timestamp
);

CREATE TABLE "rating" (
  "id" SERIAL PRIMARY KEY,
  "subject_id" int,
  "value" int,
  "created_at" timestamp
);

CREATE TABLE "job" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "location" varchar,
  "pet_plant" varchar,
  "employer_id" int,
  "sitter_id" int,
  "applicants" int,
  "created_at" timestamp
);

CREATE TABLE "conversation" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "participant1_id" int,
  "participant2_id" int,
  "created_at" timestamp
);

CREATE TABLE "message" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "sender_id" int,
  "receiver_id" int,
  "conversation_id" int,
  "created_at" timestamp
);

CREATE TABLE "event_comment" (
  "id" SERIAL PRIMARY KEY,
  "event_id" int,
  "comment" varchar,
  "user_id" int,
  "created_at" timestamp
);

CREATE TABLE "job_applicant" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "job_id" int,
  "created_at" timestamp
);

CREATE TABLE "pet_plant_descriptor" (
  "id" SERIAL PRIMARY KEY,
  "descriptor" varchar,
  "pet_plant_id" int,
  "created_at" timestamp
);

CREATE TABLE "event_participant" (
  "id" SERIAL PRIMARY KEY,
  "event_id" int,
  "user_id" int,
  "created_at" timestamp
);

CREATE TABLE "gallery" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "created_at" timestamp
);

CREATE TABLE "gallery_entry" (
  "id" SERIAL PRIMARY KEY,
  "url" varchar,
  "gallery_id" int,
  "created_at" timestamp
);

ALTER TABLE "pet_plant" ADD FOREIGN KEY ("owner_id") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "job" ("employer_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "job" ("sitter_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "event" ("host");

ALTER TABLE "message" ADD FOREIGN KEY ("conversation_id") REFERENCES "conversation" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "message" ("sender_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "message" ("receiver_id");

ALTER TABLE "rating" ADD FOREIGN KEY ("subject_id") REFERENCES "users" ("id");

ALTER TABLE "rating" ADD FOREIGN KEY ("value") REFERENCES "users" ("rating");

ALTER TABLE "rating" ADD FOREIGN KEY ("value") REFERENCES "pet_plant" ("rating");

ALTER TABLE "rating" ADD FOREIGN KEY ("subject_id") REFERENCES "pet_plant" ("id");

ALTER TABLE "conversation" ADD FOREIGN KEY ("participant1_id") REFERENCES "users" ("id");

ALTER TABLE "conversation" ADD FOREIGN KEY ("participant2_id") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "event" ("id");

ALTER TABLE "event_comment" ADD FOREIGN KEY ("event_id") REFERENCES "event" ("id");

ALTER TABLE "event" ADD FOREIGN KEY ("id") REFERENCES "event_participant" ("event_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "event_comment" ("user_id");

ALTER TABLE "pet_plant" ADD FOREIGN KEY ("id") REFERENCES "pet_plant_descriptor" ("pet_plant_id");

ALTER TABLE "job" ADD FOREIGN KEY ("id") REFERENCES "job_applicant" ("job_id");

ALTER TABLE "job_applicant" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "event_participant" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "gallery" ADD FOREIGN KEY ("id") REFERENCES "users" ("gallery_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "gallery" ("user_id");

ALTER TABLE "gallery" ADD FOREIGN KEY ("id") REFERENCES "gallery_entry" ("gallery_id");