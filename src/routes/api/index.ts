import { Router } from 'express';
const router = Router();

//Import User routes
import userRoutes from './userRoutes.js';

// Import thought routes
import thoughtRoutes from './thoughtRoutes.js'

// thought/users path
router.use('/users', userRoutes);
router.use('/thought', thoughtRoutes);

export default router;
