const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    match: /[a-z]/
  },
  last_name: {
    type: String,
    required: true,
    match: /[a-z]/
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 5
  },
  password: {
    type: String,
    required: true,
    min: 5
  },
  email: String,
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  photo_profile: {
    type: String,
    default: null
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

var User = mongoose.model('User', userSchema)
module.exports = User
