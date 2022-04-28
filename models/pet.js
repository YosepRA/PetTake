const mongoose = require('mongoose');

const paginatePlugin = require('./plugins/paginate.js');

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
  images: [
    {
      publicId: String,
      url: String,
    },
  ],
  description: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

petSchema.plugin(paginatePlugin);

module.exports = mongoose.models.Pet || mongoose.model('Pet', petSchema);
