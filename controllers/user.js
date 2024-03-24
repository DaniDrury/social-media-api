// const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().select('-__v');

      if (!users) { 
        res.status(404).json({ msg: "Users not found", users });
      };

      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId).select('-__v');

      if (!user) {
        return res.status(404).json({ msg: 'No user found with that ID' });
      };

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "There was an issue with the server, please double check your request parameters and try again", err });
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      };

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      };

      res.status(200).json({ msg: "Success - User Deleted", user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    const userId = req.params.id;
    const friendId = req.params.friendId;

    try {
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      };

      const friend = await User.findById(friendId);

      if (!friend) {
        return res.status(404).json({ msg: 'No user found with that friend ID'});
      }

      user.friends.push(friendId);
      await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    const userId = req.params.id;
    const friendId = req.params.friendId;

    try {
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      };

      if (!user.friends.includes(friendId.toString())) {
        return res.status(404).json({ msg: "No matching friend found for selected user" });
      };

      user.friends.pull(friendId);
      await user.save();
      res.status(200).json({ msg: "Friend Removed", user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}