const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  name: { type: String, required: [true, 'Please tell us your name!'] },
  email: { type: String, required: [true, 'Please provide your email'], unique: true, lowercase: true },
  userType: { type: String, enum: ['realtor', 'buyer'], default: 'realtor' },
  password: { type: String, required: [true, 'Please provide a password'], minlength: 8 },
  passwordConfirmation: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (pwd) {
        return pwd === this.password;
      },
      message: "The password confirmation did not match"
    }
  },
  passwordChangedAt: Date,
  passwordResetExpires: Date,
});

// Apply the auto-increment plugin to the userId field


// Add encrypting the password middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next;
  }

  // If new and modified
  this.password = await bcrypt.hash(this.password, 12); // How intensive the CPU will be
  this.passwordConfirmation = undefined; // We do not want to store in the database
  next();
});

// Model instance method will be available to all instances of the user.
userSchema.methods.isPasswordMatch = async (userSuppliedPassword, currentHashedPasswordInDB) => {
  return await bcrypt.compare(userSuppliedPassword, currentHashedPasswordInDB);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
