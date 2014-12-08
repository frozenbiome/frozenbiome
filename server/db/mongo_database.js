var mongoose = require('mongoose');
//For parsing mongolab uri in prod
var uriUtil = require('mongodb-uri');

var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

//30 second timeout
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };  

//Mongoose uses a different url format that standard mongodb. This helps us
//convert.
var mongooseUri;
if (process.env.MONGOLAB_URI) { //If we have an env variable in prod, use that
  mongooseUri = uriUtil.formatMongoose(process.env.MONGOLAB_URI);
} else {
  mongooseUri = 'mongodb://localhost/waffledb'; //Otherwise, connect to your local instance. Choose name here.
}

mongoose.connect(mongooseUri, options, function (err, res) {
    if (err) { 
        console.log('Connection refused to ' + mongooseUri);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + mongooseUri);
    }
});





//Define Schema//////////////////////////
var Schema = mongoose.Schema;

// User schema
var User = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: {type: String, required: true },
    created: { type: Date, default: Date.now },
    posts: [Post]
});

//Post schema
var Post = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    username: { type: String, required: true },
    is_published: { type: Boolean, default: false },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
});

// Bcrypt middleware on UserSchema
User.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

//Password verification method
User.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

// Export Models
exports.userModel = mongoose.model('User', User);
exports.postModel = mongoose.model('Post', Post);
