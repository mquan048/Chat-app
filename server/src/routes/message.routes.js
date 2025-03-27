import express from 'express';
import { messageController } from '../controllers/index.js';
import { authMiddleware } from '../middlewares/index.js';

const router = express.Router();

router.get(
  '/:chatId',
  authMiddleware.verifyToken,
  messageController.getMessages
);

export default router;
