var express     = require('express');
var bodyParser = require('body-parser'); //bodyparser + json + urlencoder
var morgan  = require('morgan'); // logger
var mongo_helpers = require('./db/mongo_helpers.js')
var session = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
  secret: 'zfnzkwjehgweghw',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/../client'));

//Set up routes
var routes = {};


/********** GET REQUESTS ********/

// get all posts for user
//  http://www.wafflepress.com/users?q=evan
app.get('/users', function(req, res) {
  //TODO: If username is in URL, parse that. If not, get from session
	username = req.query.q;
	mongo_helpers.getAllPosts(username, function(posts, status) {
    if (status) {
      res.status(status).send(posts);
    } else {
      res.send(posts);
    }
	})
})

app.get('/logout', function(req,res) {
	if (req.session) {
		console.log(req.session)
	    req.session.destroy(function(){});
  }
})




/********** POST REQUESTS ********/

//sign up new user
app.post('/signup', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	mongo_helpers.saveNewUser(username, password, 
		function() { res.status(403).send('Username Taken!')}, 
		function() { 
			req.session.regenerate(function(){
				req.session.user = username;
			});
			res.send('Saved!'); 
		})
})

//login with authentication 
app.post('/login', function(req,res) {
  var username = req.body.username;
  var password = req.body.password;
  mongo_helpers.authenticateUser(username, password, 
  	function() { res.status(403).send('User or Password Incorrect')}, 
  	function() { 
  		req.session.regenerate(function(){
  			req.session.user = username;
  			console.log("CREATED SESSION FOR ", username)
  		});
  		res.send("It's Waffle Time!");
  	})
});

//save new post
app.post('/newPost', function(req, res) {
	// if (req.session.user) {
    //var username = req.session.user;
    var username = req.body.username;
		var title = req.body.title;
		var content = req.body.content;
		mongo_helpers.saveNewPost(username, title, content, 
			function() { res.status(403).send('Post Failed!')}, 
			function() { res.send('Posted!')})
	// } else {
		// res.status(401).send('You are not logged in');
	// }
})



// export our app for testing and flexibility, required by index.js
module.exports = app;
