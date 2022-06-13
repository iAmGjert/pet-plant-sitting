var express = require('express');
var path = require('path');
var morgan = require('morgan');
var Rating = require('../database/index').Rating;
var app = express();
//database connection
// const { db } = 
// console.log(db, "test");
// require('../database/index');
var CLIENT_PATH = path.resolve(__dirname, '../client/build');
app.use(express.static(CLIENT_PATH));
app.use(express.json());
app.use(morgan('tiny'));
// db.authenticate()
//   .then(() => console.log('🥂 Connected to database'))
//   .catch((err: string) => console.error(err));
// const noob = await Rating.create({
//   subject_id: 1,
//   value: 2
// }).then((res: object) => console.log(noob))
//   .catch((e: string) => console.log(e));
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("\uD83D\uDE80 Server is listening at http://localhost:".concat(port));
});
