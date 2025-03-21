import { Router } from 'express';
const router = Router();
import thoughtController from '../../controllers/thoughtController.js';


// Routes
router.route('/')
  .get(thoughtController.getThoughts)     // Get all thoughts
  .post(thoughtController.createThought); // Create a new thought

router.route('/:thoughtId')
  .get(thoughtController.getThoughtById); // Get a thought by ID

router.route('/:thoughtId/reaction')
  .post(thoughtController.addReaction); // Add a reaction to a thought

export default router;
