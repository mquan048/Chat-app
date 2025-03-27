import { authService, userService } from '../services/index.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Unathorized!',
      });
    }
    const decoded = await authService.decodeToken(token);
    const user = await userService.getById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: 'Not found!',
      });
    } else {
      req.userId = decoded.id;
      next();
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token is expired!',
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Token is invalid!',
      });
    } else {
      console.error(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};
