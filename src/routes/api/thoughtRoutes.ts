import { Router } from 'express';
import thoughtController from '../../controllers/thoughtController.js';

const router = Router();
const { getThoughts, getThoughtById, createThought, addReaction, updateThought } = thoughtController;

// Get all thoughts or create a new thought
router.route('/').get(getThoughts).post(createThought);

// Get, update, or delete a single thought by ID
router.route('/:thoughtId').get(getThoughtById).put(updateThought);

// Add a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

export default router;
