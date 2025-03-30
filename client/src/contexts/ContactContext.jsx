import { createContext, useCallback, useEffect, useState } from 'react';

import apis from '../utils/api';
import { useAuth } from '../hooks';

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const [listContact, setListContact] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const { user } = useAuth();

  const changeFocusContact = useCallback(
    (id) => {
      setSelectedContact(
        listContact.find((contact) => contact.ContactId == id)
      );
    },
    [listContact]
  );

  useEffect(() => {
    apis.get('/api/contact').then((response) => {
      setListContact(response.data);
      setSelectedContact(response.data[0]);
    });
  }, [user]);

  return (
    <ContactContext.Provider
      value={{ listContact, selectedContact, changeFocusContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactProvider };
