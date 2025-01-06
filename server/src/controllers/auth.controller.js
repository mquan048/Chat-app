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
      return res.status(404).json({ message: 'The email has existed' });
    }
    if (!userValidation.validPassword(req.body.password)) {
      return res.status(400).json({ message: 'The password is too weak' });
    }
    const hashPassword = await authService.hashPassword(req.body.password);
    const user = await userService.create({
      ...req.body,
      password: hashPassword,
    });
    return res.status(201).json({
      message: 'User created',
      data: { userId: user },
    });
  } catch (error) {
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
      message: 'User logged in',
      data: { token, user },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
