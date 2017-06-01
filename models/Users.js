var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


var UserSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, unique: true},
  firstName: String,
  lastName: String,
  dob: Date,
  age: Number,
  state: String,
  city: String,
  postcode: String,
  country: String,
  profilePic: String,
  hash: String,
  salt: String,
  facebook: {
    userID: String, 
    accessToken: String,
    profilePicture: String
  }
});

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  var cert = process.env.jwtSecret ? process.env.jwtSecret : 'SECRET';

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000),
  }, cert);
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

mongoose.model('User', UserSchema);