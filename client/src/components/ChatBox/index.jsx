import { useEffect, useState } from 'react';

import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const mockData = [
  {
    content: 'Hello',
    senderId: '1',
  },
  {
    content: 'Hi',
    senderId: '5',
  },
  {
    content: 'Hi',
    senderId: '5',
  },
];

const Message = ({ content, isByUser }) => {
  return (
    <div className={'message ' + (isByUser ? 'by-user' : 'by-contact')}>
      {content}
    </div>
  );
};

const ChatBox = ({ contactId }) => {
  const [listMessage, setListMessage] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message) {
      //Send message
      setListMessage([
        {
          content: message,
          userId: 5,
        },
        ...listMessage,
      ]);
      setMessage('');
    }
  };

  useEffect(() => {
    setListMessage(mockData);
  }, []);

  return (
    <>
      <div className="chat-box">
        {listMessage.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            isByUser={message.senderId != contactId}
          />
        ))}
      </div>
      <div className="send-box">
        <textarea
          type="text"
          className="send-input"
          placeholder="Type a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <FontAwesomeIcon
          className="send-btn"
          icon={faPaperPlane}
          size="2x"
          onClick={handleSendMessage}
        />
      </div>
    </>
  );
};

export default ChatBox;
