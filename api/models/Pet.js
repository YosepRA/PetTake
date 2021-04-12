const mongoose = require('mongoose');

const { Schema } = mongoose;

const petSchema = new Schema({
  createdDate: { type: Date, default: Date.now },
  name: String,
  breed: String,
  age: String,
  gender: String,
  coatLength: String,
  preferHomeWith: [String],
  preferHomeWithout: [String],
  health: [String],
  images: [String],
  description: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Pet', petSchema);
