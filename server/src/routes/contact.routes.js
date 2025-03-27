import express from 'express';
import { contactController } from '../controllers/index.js';
import { authMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get('/', authMiddleware.verifyToken, contactController.getAllContacts);

export default router;
