const { Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select('-__v');

      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createThought(req ,res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async getThoughtById(req, res) {
    const thoughtId = req.params.id;

    try {
      const thought = await Thought.findById(thoughtId).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID'});
      };

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    const thoughtId = req.params.id;

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought found with that ID'});
      };

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  },
  async deleteThought(req, res) {
    const thoughtId = req.params.id;

    try {
      const thought = await Thought.findOneAndDelete(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID'});
      }

      res.status(200).json({ message: "Success - Deleted thought", thought });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    const thoughtId = req.params.id;

    try {
      const thought = await Thought.findById(thoughtId);
      
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      };

      thought.reactions.push(req.body);
      await thought.save();
      res.status(200).json({ msg: "Reaction added: ", thought });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  },
  async deleteReaction(req, res) {
    const thoughtId = req.params.id;
    const reactId = req.params.reactionId;

    try {
      const thought = await Thought.findById(thoughtId);
      
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      };

      let count = 0;
      for (let i = 0; i < thought.reactions.length; i++) {
        if ((thought.reactions[i].reactionId).toString() === reactId) {
          count++;
        };
      };

      if (count === 0) {
        return res.status(404).json({ msg: "No reaction with that ID found for associated thought"});
      }

      const reaction = thought.reactions.pull({ reactionId: reactId });
      await thought.save();
      res.status(200).json({ msg: "Reaction Deleted", reaction });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  },
}