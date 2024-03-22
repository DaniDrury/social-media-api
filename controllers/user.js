// const { ObjectId } = require('mongoose').Types;
const { User, Friend } = require('../models');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

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
        return res.status(404).json({ message: 'No user found with that ID' });
      };

      // userObj = {
      //   user,
      //   friendCount: await (friendCount()),
      // }

      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
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
      const user = await User.findOneAndDelete(userId);

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

      user.friends.push(friendId);
      // await user.save();
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

      user.friends.pull(friendId);
      // await user.save();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
}