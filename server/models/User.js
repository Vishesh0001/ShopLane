
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Basic email regex
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Enforce minimum leng
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);
module.exports= User;