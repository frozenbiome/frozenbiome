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
app.get('/users*', function(req, res) {
  //TODO: If username is in URL, parse that. If not, get from session
  var username;
  var direct_query_username = req.url.split('/')[2];

  console.log("USER FROM COOKIE", req.session.user)

  if (direct_query_username !== undefined) {
    username = direct_query_username;
  } else if (req.session.user) {
    username = req.session.user;
  } 

	mongo_helpers.getAllPosts(username, function(posts, status) {
    if (status) {
      res.status(status).send(posts);
    } else {
      res.send(posts);
    }
	})
})

app.get('/logout', function(req,res) {
	console.log(req.session)
	if (req.session.user) {
	    console.log("DESTROYING SESSION FOR ", req.session.user);
	    req.session.destroy(function(){});
 	} else {
 		res.status(400).send('Not logged in!')
 	}
})




/********** POST REQUESTS ********/

//sign up new user
app.post('/signup', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
  var displayName = req.body.displayName;
	mongo_helpers.saveNewUser(username, password, displayName,
		function() { res.status(403).send('Username Taken!')}, 
		function() { 
			req.session.regenerate(function(){
        req.session.user = username;
				req.session.displayName = displayName;
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
  			console.log(req.session)
  			res.send("It's Waffle Time!");
  		});
  	})
});

//save new post
app.post('/newPost', function(req, res) {
	// if (req.session.user) {
    var username = req.session.user;
    //var username = req.body.username;
    console.log("POSTING FOR", username)
		var title = req.body.title;
		var content = req.body.content;
		mongo_helpers.saveNewPost(username, title, content, 
			function() { res.status(403).send('Post Failed!')}, 
			function() { res.send('Posted!')})
})

app.post('/updatePost', function(req, res) {
	// if (req.session.user) {
    //var username = req.session.user;
    console.log("UPDATE SERVER HERE!!!!!!!")
    var username = req.body.username;
		var title = req.body.title;
		var content = req.body.content;
		var postID = req.body.postID;
		mongo_helpers.updatePost(username, title, content, postID, 
			function() { res.status(403).send('Post Failed!')}, 
			function() { res.send('Posted!')})

})



// export our app for testing and flexibility, required by index.js
module.exports = app;
