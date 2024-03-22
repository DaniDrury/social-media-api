const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => moment(),
      get: formatDate,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ reactionSchema ],
  },
  {
    virtuals: {
      reactionCount: {
        get() {
          return this.reactions.length;
        },
      },
    },
    toJSON: { virtuals: true, getters: true },
  },
);

function formatDate(createdAt) {
  return moment(createdAt).format("MM, DD, YYYY");
};

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;