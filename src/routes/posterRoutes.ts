import { Router } from 'express';
import { createPoster, getUserPosters, getPosterById } from '../controllers/posterController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateJWT, createPoster);
router.get('/user', authenticateJWT, getUserPosters);
router.get('/:id', authenticateJWT, getPosterById);

export default router;