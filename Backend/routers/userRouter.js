import express from 'express';
import { signupUser, loginUser, getUserWithBlogs } from '../controllers/userController.js';
import authenticateToken from '../middleware/authenticateToken.js';
const router = express.Router();
router.post('/register', signupUser);
router.post('/login', loginUser);
router.get('/:id', authenticateToken, getUserWithBlogs);
export default router;