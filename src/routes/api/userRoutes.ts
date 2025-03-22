import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, deleteUserThought, addFriend, removeFriend, updateUser } from '../../controllers/userController.js';

// Gets all users     /api/users
router.route('/').get(getUsers).post(createUser);

// Gets, updates, or deletes a single user     /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUserThought);

// Add and remove friends     /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export default router;
