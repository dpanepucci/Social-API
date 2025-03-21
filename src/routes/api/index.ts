import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';

// Import thought routes
import thoughtRoutes from './thoughtRoutes.js'

// give thoughts path
router.use('/users', userRoutes);
router.use('/thought', thoughtRoutes);

export default router;
