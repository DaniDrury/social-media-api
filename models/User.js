const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,4}$/.test(value);
        },
        message: 'Invalid email address format',
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    virtuals: {
      friendCount: {
        get() {
          console.log('here');
          return this.friends.length;
        },
      },
    },
  },
  {
    toJSON: { virtuals: true, getters: true },
  },
);

const User = model('User', userSchema);

module.exports = User;