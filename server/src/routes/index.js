import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import contactRoutes from './contact.routes.js';
import messageRoutes from './message.routes.js';

const router = express.Router();

export const initRoutes = (app) => {
  router.use('/auth', authRoutes);
  router.use('/user', userRoutes);
  router.use('/contact', contactRoutes);
  router.use('/message', messageRoutes);

  app.use('/api', router);
};

export { authRoutes, userRoutes };
