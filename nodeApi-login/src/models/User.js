const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   role: String,
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;



const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
  },
  password: {
    required: false,
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  authSource: {
    type: String,
    enum: ['self', 'google','facbook'],
    default: 'self',
  },
});

const UserSchema = mongoose.model('googleUser', userSchema);

module.exports = UserSchema;
