import { chatService } from '../services/index.js';

export const getAllContacts = async (req, res) => {
  const contactList = await chatService.getAll(req.userId);
  return res.status(200).json(contactList);
};
