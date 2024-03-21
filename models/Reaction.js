const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => moment(),
      get: (createdAt) => { return createdAt.format("MM, DD, YYYY") },
    },
  },
  {
    toJSON: { getters: true },
  }
);

module.exports = reactionSchema;