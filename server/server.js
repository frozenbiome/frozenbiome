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


/********** GET REQUESTS ********/

// get all posts for user
//  http://www.wafflepress.com/users?q=evan
app.get('/users', function(req, res) {
	username = req.query.q;
	mongo_helpers.getAllPosts(username, function(posts) {
		res.send(posts);
	})
})




/********** POST REQUESTS ********/

//sign up new user
app.post('/signup', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	mongo_helpers.saveNewUser(username, password, function() { res.status(403).send('Username Taken!')}, function() { res.send('Saved!')})
})

//save new post
app.post('/newPost', function(req, res) {
	var username = req.body.username;
	var title = req.body.title;
	var content = req.body.content;
	mongo_helpers.saveNewPost(username, title, content, function() { res.status(403).send('Post Failed!')}, function() { res.send('Posted!')})
})



// export our app for testing and flexibility, required by index.js
module.exports = app;
