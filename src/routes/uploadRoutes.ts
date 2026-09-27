import { Router } from 'express';
import { uploadPhoto } from '../controllers/uploadController';
import { upload } from '../config/cloudinary';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Single photo upload route (Protected with JWT)
router.post('/', authenticateJWT, upload.single('photo'), uploadPhoto);

export default router;