
# Fern Herm

Fern Herm is a mobile-focused web service connecting users to the perfect pet and/or plant sitter. 

## Description

The name of our app *Fern Herm* is a play on words from the iconic 1980's Film **E.T. the Extra-Terrestrial** and the character's  "Phone Home" line. Our app allows users to find potential sitters for their pet or plant or, conversely, allows potential sitters to find a job looking after someone is while they are away from home. Users can post job listings, setup a profile for themselves, their pets, and their plants, view others' profiles, communicate with each other using our live chat feature, find interesting local events, use our built-in map and calendar features to keep organized, and even look up information regarding plant or animal species/breeds with which they might be unfamiliar.   

## Getting Started

### Deployed Instance

https://fernherm.com/
### Technologies Used
 **NOTE:** This app was built using a Mac OS and WSL (Windows Subsystem for Linux) environment, Node.js v14, Git, and PostgreSQL v12 and can be consider prerequisites for the installation of the app.
* Node - Runtime Environment
* Git - Version Control System
* TypeScript - JavaScript superset
* Express - Back-End Web Framework
* React - Front-End JavaScript Library
* Redux - State Management Framework
* PostgreSQL - Relational Database Management System
* Sequelize - Object–relational mapping tool
* Bootstrap - CSS Framework
* AWS Elastic Compute Cloud (EC2) - Cloud Computing Platform for Hosting Web Server
* AWS Relational Database Service (RDS) - Relational Database Service 
* socket.io - Web Socket Library
* Passport - Authentication Framework
* Axios - HTTP Client Library
* Mapbox - Geocoding and Reverse Geocoding Library
* Cloudinary - Image Library
* Eslint - Code Analyzer
* Webpack - Bundler
* Babel - Transpiler

## Installing
### fork the repo and clone into your project directory
```bash
# install dependencies
$ npm install
```


## Executing program

### Connect to local DB

```bash 
# WSL users
# start postgresql service
$ sudo service postgresql start

# connect to postgres shell
$ sudo -u postgres psql

# MAC users
# start postgresql service
$ postgres -D /usr/local/var/postgres

# connect to postgres shell
$ psql postgres
```

### Inside the postgres shell

```sql
# ALTER USER postgres CREATEDB

/* check permissions */
# \du

/* change password if needed */
# \password new_password

/* create database */
# CREATE DATABASE db_name;

/* check that database was created */
# \l

/* quit shell if desired */
# \q
```

### Setup the Environment Variables
#### Links to setup .env file
* [Google Developer Console](https://console.cloud.google.com)
* [Map Box](https://www.mapbox.com/)
* [Cloudinary](https://cloudinary.com/)

```bash
# create .env file
$ touch .env

# .env file contents
# Client
PORT=
CLIENT_URL=

# Database
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
DB_DIALECT=
DB_PORT=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SESSION_SECRET=

#Mapbox
MAPBOX_TOKEN=

#Cloudinary
CLOUDINARY_NAME=
CLOUDINARY_PRESET=
```
### Start the app 
```bash
# Build the app
$ npm run build

# Run the app
$ npm run start
```


## Authors
  
* [Braeden Ford](https://github.com/bford002)
* [Eric Gjertsen](https://github.com/iAmGjert)
* [Iben Oneal](https://github.com/Ibenyourbro)
* [Raymond Jeong](https://github.com/raymondjjeong)
* [Royce Reed](https://github.com/royce-reed)
* [Sam Cabrera](https://github.com/velouriagreen)



