import { createContext, useCallback, useEffect, useState } from 'react';

import apis from '../utils/api';
import { useAuth } from '../hooks';

const MessageContext = createContext();

const MessageProvider = ({ chatId, children }) => {
  const [listMessage, setListMessage] = useState([]);
  const [message, setMessage] = useState('');

  const { user } = useAuth();

  const sendMessage = useCallback(() => {
    if (message) {
      //Send message
      setListMessage([
        {
          message: message,
          senderId: user.userId,
        },
        ...listMessage,
      ]);
      setMessage('');
    }
  }, [user, listMessage, message]);

  useEffect(() => {
    if (chatId) {
      apis.get(`/api/message/${chatId}`).then((response) => {
        setListMessage(response.data);
      });
    }
  }, [chatId]);

  return (
    <MessageContext.Provider
      value={{ listMessage, message, setMessage, sendMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
