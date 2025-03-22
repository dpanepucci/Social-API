import User from '../models/User.js';
import Thought from '../models/Thought.js'; // Import the Thought model
import { Request, Response } from 'express';

 // get all Users
  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
 // get a single User
  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
         return res.status(404).json({ message: 'No user with that ID' });
      } else {
        return res.json(user);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.create(req.body);
      return res.json(dbUserData);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  // delete user and associated thoughts
  export const deleteUserThought = async (req: Request, res: Response) => {
    try {
      // Find and delete the user by ID
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Delete all thoughts associated with the user
      await Thought.deleteMany({ userId: req.params.userId });

      return res.json({ message: 'User and associated thoughts deleted successfully!' });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  // Update a user's information
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        req.body, // The updated data from the request body
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      return res.json({ message: 'User updated successfully!', user });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  // Add a friend to a user's friend list
  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } }, // Add friendId to the friends array if it doesn't already exist
        { new: true } 
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      return res.json({ message: 'Friend added successfully!', user });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  // Remove a friend from a user's friend list
  export const removeFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } }, // Remove friendId from the friends array
        { new: true } 
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      return res.json({ message: 'Friend removed successfully!', user });
    } catch (err) {
      return res.status(500).json(err);
    }
  };
