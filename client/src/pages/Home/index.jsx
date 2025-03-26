import { useCallback, useEffect, useState } from 'react';

import Contact from '../../components/Contact';
import ChatBoxHeader from './../../components/ChatBoxHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import ChatBox from '../../components/ChatBox';

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

const Home = () => {
  const [listContact, setListContact] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    setListContact(contactListMockData);
    setSelectedContact(contactListMockData[0]);
  }, []);

  const handleChangeContact = useCallback(
    (id) => {
      setSelectedContact(listContact.find((contact) => contact.id == id));
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
          {listContact.map((contact) => (
            <Contact
              key={contact.id}
              id={contact.id}
              name={contact.name}
              lastMessage={contact.lastMessage}
              urlAvatar={contact.avatar}
              selectedId={selectedContact.id}
              onClick={handleChangeContact}
            />
          ))}
        </div>
      </div>
      <div className="chat-warp">
        <ChatBoxHeader contactInfo={selectedContact} />
        <ChatBox contactId={selectedContact?.id} />
      </div>
    </div>
  );
};

export default Home;
