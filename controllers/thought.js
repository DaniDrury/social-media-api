const { Thought, Reaction } = require('../models');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();

      const thoughtsObj = {
        thoughts,
        reactionCount: reactionCount(),
      };

      res.status(200).json(thoughtsObj);
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
    const thoughtId = req.params;

    try {
      const thought = await Thought.findById(thoughtId).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID'});
      };

      const thoughtObj = {
        thought,
        reactionCount: reactionCount(),
      };

      res.status(200).json(thoughtObj);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    const thoughtId = req.params;

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
    const thoughtId = req.params;

    try {
      const thought = await Thought.findOneAndDelete(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID'});
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createReaction(req, res) {
    const thoughtId = req.params;

    try {
      const thought = await Thought.findById(thoughtId);
      
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      };
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };

    try {
      const reaction = thought.reactions.create(req.body);
      res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  },
  async deleteReaction(req, res) {
    const thoughtId = req.params.id;
    const reactionId = req.params.reactionId;

    try {
      const thought = await Thought.findById(thoughtId);
      
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      };
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };

    try {
      const reaction = thought.reactions.create(req.body);
      res.status(200).json(reaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  },
}