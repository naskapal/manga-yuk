const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

const mangaSchema = new Schema({
  uploader: {
    type: ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true,
    match: /[a-z]/
  },
  genre: {
    type: String,
    required: true
  },
  img: [{
    type: String,
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

var Manga = mongoose.model('Manga', mangaSchema)
module.exports = Manga
