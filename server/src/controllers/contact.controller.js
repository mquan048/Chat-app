import { chatService } from '../services/index.js';

export const getAllContacts = async (req, res) => {
  const contactList = await chatService.getAll(req.userId);
  return res.status(200).json(
    contactList.map((contact) => ({
      chatId: contact.chatid,
      userId: contact.userid,
      name: contact.name,
      lastMessage: contact.lastmessage,
    }))
  );
};
