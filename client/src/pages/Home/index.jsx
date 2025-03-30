import { useContact } from '../../hooks';

import Contact from '../../components/Contact';
import ChatBox from '../../components/ChatBox';
import ChatBoxHeader from './../../components/ChatBoxHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { MessageProvider } from '../../contexts/MessageContext';

const avatar =
  'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png';

const Home = () => {
  const { listContact, selectedContact, changeFocusContact } = useContact();

  return (
    <div className="content-warp">
      <div className="slide-bar">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <span className="form-focus">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          </span>
        </div>
        <div className="contact-list">
          {listContact.map((contact, index) => (
            <Contact
              key={index}
              id={contact.chatId}
              name={contact.name}
              lastMessage={contact.lastMessage}
              urlAvatar={avatar}
              selectedId={selectedContact.chatId}
              onClick={changeFocusContact}
            />
          ))}
        </div>
      </div>
      <div className="chat-warp">
        <ChatBoxHeader contactInfo={selectedContact} />
        <MessageProvider chatId={selectedContact?.chatId}>
          <ChatBox />
        </MessageProvider>
      </div>
    </div>
  );
};

export default Home;
