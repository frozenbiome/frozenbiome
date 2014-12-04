var express     = require('express');
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder
var morgan  = require('morgan'); // logger

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Set up routes
var routes = {};

var testdb = require('./db/mongo_database.js')

var grant = new testdb.userModel({
  username: "tim",
  password: "dumbpassword"
})

grant.save(function(err, doc) {
  if (err) console.log(err);
  console.log(doc);
})



// export our app for testing and flexibility, required by index.js
module.exports = app;
