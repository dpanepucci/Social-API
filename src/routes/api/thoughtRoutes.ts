import { Router } from 'express';
const router = Router();
import thoughtController from '../../controllers/thoughtController.js';


// Routes

// Get all thoughts, Create a new thought
router.route('/')
  .get(thoughtController.getThoughts)     
  .post(thoughtController.createThought); 

// Get a thought by ID
router.route('/:thoughtId')
  .get(thoughtController.getThoughtById); 

// Add a reaction to a thought
router.route('/:thoughtId/reaction')
  .post(thoughtController.addReaction); 

export default router;
