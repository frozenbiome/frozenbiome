var express     = require('express');
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder
var morgan  = require('morgan'); // logger
var mongo_helpers = require('./db/mongo_helpers.js')

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//Set up routes
var routes = {};

mongo_helpers.getAllPosts("evan", function(posts) {
	console.log(posts);
});

// mongo_helpers.saveNewPost("grant", "WafflesAreGreat", "SOOOOOOOOgreeeaatt11!!!1!!");

// mongo_helpers.saveNewUser("grant", "wins");

// var db = require('./db/mongo_database.js')

// var grant = new db.userModel({
//   username: "evan",
//   password: "password"
// })

// var post = new db.postModel({
// 	title: "test post",
// 	// author: 
// 	is_published: true,
// 	content: "thecontentz"
// })

// grant.save(function(err, doc) {
//   if (err) console.log(err);
//   console.log(doc);
// })


// db.userModel.findOneAndUpdate({username: "evan"}, {$push: {posts: post}}, {safe: true, upsert: true} ,function(err, doc){
// 	if (err) {throw err;}
// 	console.log(doc)
// })




// export our app for testing and flexibility, required by index.js
module.exports = app;
