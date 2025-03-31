const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  fatherName: String,
  dob: Date,
  branch: String,
  rollNo: { type: String, required: true, unique: true },
  section: String,
  address: String,
  mobileNo: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
