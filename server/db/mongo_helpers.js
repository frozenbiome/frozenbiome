var db = require('./mongo_database.js')

var saveNewUser = exports.saveNewUser = function(username, password, errCallback, successCallback) {
	var newUser = new db.userModel({
	  username: username,
	  password: password
	});

	newUser.save(function(err, doc) {
	  if (err) { errCallback(); }
	  successCallback();
	})
}


var saveNewPost = exports.saveNewPost = function(username, title, content, errCallback, successCallback, isPublished) {
	var post = new db.postModel({
		title: title,
		// is_published: isPublished,
		content: content
	})

	db.userModel.findOneAndUpdate({username: username}, {$push: {posts: post}}, {safe: true, upsert: true} ,function(err, doc){
		if (err) { errCallback(); }
		successCallback();
	})
}


var getAllPosts = exports.getAllPosts = function(username, callback) {
	db.userModel.findOne({username: username}, function(err,doc) {
		if (err) { throw err; }
		callback(doc.posts);
	})
}


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