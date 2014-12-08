var db = require('./mongo_database.js');
var bcrypt = require('bcrypt-nodejs');
var ObjectID = require('mongoose').Types.ObjectId;

var saveNewUser = exports.saveNewUser = function(username, password, displayName, errCallback, successCallback) {
	var newUser = new db.userModel({
	  username: username,
	  password: password,
	  displayName: displayName
	});

	newUser.save(function(err, doc) {
	  if (err) { errCallback(); }
	  else { successCallback(); }
	})
}


var saveNewPost = exports.saveNewPost = function(username, displayName, title, content, errCallback, successCallback, isPublished) {
	var post = new db.postModel({
		title: title,
		// is_published: isPublished,
		content: content,
		author: displayName,
		username: username
	})

  //Won't write if user not found, but won't throw error either
	db.userModel.findOneAndUpdate({username: username}, {$push: {posts: post}, new: true}, function(err, doc){
		if (err) { errCallback(); }
		else { successCallback(); }
	})
}

var updatePost = exports.updatePost = function(username, title, content, postID, errCallback, successCallback, isPublished) {
	db.userModel.update(
		{'posts._id': new ObjectID(postID)}, {$set: {
			'posts.$.title': title,
   			'posts.$.content': content
		}}, function(err, doc){
		if (err) { console.log(error); }
		else { successCallback(); }
	})    
}



var getAllPosts = exports.getAllPosts = function(username, callback) {
  db.userModel.findOne({username: username})
    .exec(
      function(err,doc) {
        if (err) { throw err; }
        if (doc) {
          callback(doc.posts);
        } else {
          callback("User not found", 403)
        }
      }
    ) 
};


var authenticateUser = exports.authenticateUser = function(username, password, errCallback, successCallback) {
	db.userModel.findOne({username: username}, function(err,doc) {
    //Mongoose error
		if (err) { errCallback(); }
	    else {
        //User not found
        if (doc == null) {
          errCallback();
        //User found
        } else {
          bcrypt.compare(password, doc.password, function(err, result){
            if(!err && result){
              successCallback(doc);
            } else {
              errCallback();
            }
          });
        }
	    }
	});
}
