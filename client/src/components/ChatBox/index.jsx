import { useAuth, useMessage } from '../../hooks';
import { MessageProvider } from '../../contexts/MessageContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const Message = ({ content, isByUser }) => {
  return (
    <div className={'message ' + (isByUser ? 'by-user' : 'by-contact')}>
      {content}
    </div>
  );
};

const ChatBox = () => {
  const { listMessage, message, setMessage, sendMessage } = useMessage();
  const { user } = useAuth();

  return (
    <>
      <div className="chat-box">
        {listMessage.map((message, index) => (
          <Message
            key={index}
            content={message.message}
            isByUser={message.senderId == user.userId}
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
          onClick={sendMessage}
        />
      </div>
    </>
  );
};

export default ChatBox;
