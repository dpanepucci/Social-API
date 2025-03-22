import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, deleteUserThought, addFriend, removeFriend } from '../../controllers/userController.js';

// Gets all users     /api/users
router.route('/').get(getUsers).post(createUser);

// Gets/Delete a single user     /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUserThought);

// Add and remove friends     /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export default router;
