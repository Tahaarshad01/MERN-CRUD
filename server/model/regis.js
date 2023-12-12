// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema } = mongoose;

const registerSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  mobile: Number,
  address: String,
  password: String,
  conPassword: String,
  date: { type: Date, default: Date.now },
});

///creating  model///
const Register = mongoose.model('register', registerSchema);
module.exports = Register;