import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

export const initRoutes = (app) => {
  router.use('/auth', authRoutes);
  router.use('/user', userRoutes);

  app.use('/api', router);
};

export { authRoutes, userRoutes };
