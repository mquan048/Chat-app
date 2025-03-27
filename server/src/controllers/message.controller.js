import { chatService, messageService } from '../services/index.js';

export const getMessages = async (req, res) => {
  const checkPermission = await chatService.checkUserInChat(
    req.params.chatId,
    req.userId
  );
  if (!checkPermission) {
    return res.status(403).json({
      message: 'You are not in this chat!',
    });
  }

  const messages = await messageService.getFirst(req.params.chatId);
  return res.status(200).json(messages);
};
