const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
