import { useCallback, useEffect, useState } from 'react';

import Contact from '../../components/Contact';
import ChatBoxHeader from './../../components/ChatBoxHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import ChatBox from '../../components/ChatBox';
import apis from '../../utils/api';

const contactListMockData = [
  {
    id: '1',
    name: 'User 1',
    avatar:
      'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
    lastMessage: 'Hello',
  },
  {
    id: '2',
    name: 'User 2',
    avatar:
      'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
    lastMessage: 'Goodbye',
  },
];

const avatar =
  'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png';

const Home = () => {
  const [listContact, setListContact] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    apis.get('/api/contact').then((response) => {
      setListContact(response.data);
      setSelectedContact(response.data[0]);
    });
  }, []);

  const handleChangeContact = useCallback(
    (id) => {
      setSelectedContact(listContact.find((contact) => contact.chatId == id));
    },
    [listContact]
  );

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
              onClick={handleChangeContact}
            />
          ))}
        </div>
      </div>
      <div className="chat-warp">
        <ChatBoxHeader contactInfo={selectedContact} />
        <ChatBox
          chatId={selectedContact?.chatId}
          contactId={selectedContact?.userId}
        />
      </div>
    </div>
  );
};

export default Home;
