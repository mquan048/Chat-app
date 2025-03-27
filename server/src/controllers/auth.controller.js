import { userService, authService } from '../services/index.js';
import { userValidation } from '../validations/index.js';

export const register = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!userValidation.validName(req.body.name)) {
      return res.status(400).json({ message: 'The name is too short' });
    }
    if (!userValidation.validEmail(req.body.email)) {
      return res.status(400).json({ message: 'The email is invalid' });
    }
    if (await userService.getByEmail(req.body.email)) {
      return res.status(400).json({ message: 'The email has existed' });
    }
    if (!userValidation.validPassword(req.body.password)) {
      return res.status(400).json({
        message:
          'The password is too weak. It must have at least a lowercase, an uppercase and a number',
      });
    }
    const hashPassword = await authService.hashPassword(req.body.password);
    const user = await userService.create({
      ...req.body,
      password: hashPassword,
    });
    return res.status(201).json({
      userId: user,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = await userService.getByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isValidPassword = await authService.comparePassword(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = authService.generateToken(user);
    return res.status(200).json({
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const verify = async (req, res) => {
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
      return res.status(200).json({
        name: user.name,
        email: user.email,
      });
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
