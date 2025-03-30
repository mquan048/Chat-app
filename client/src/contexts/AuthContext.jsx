import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import socket from '../utils/socket';

import api from '../utils/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({
    name: null,
    email: null,
    token: null,
  });

  const login = useCallback(async (data) => {
    const response = await api.post('/api/auth/login', data);
    setUser({
      userId: response.data.userId,
      name: response.data.name,
      email: response.data.email,
      token: response.data.token,
    });
    localStorage.setItem('token', response.data.token);
    socket.connect(response.data.userId);
    setIsLogged(true);
  }, []);

  const register = useCallback(async (data) => {
    await api.post('/api/auth/register', data);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/api/auth/verify')
        .then((response) => {
          setUser({
            userId: response.data.userId,
            name: response.data.name,
            email: response.data.email,
            token: token,
          });
          socket.connect(response.data.userId);
          setIsLogged(true);
        })
        .catch((error) => {
          setUser({
            userId: null,
            name: null,
            email: null,
            token: null,
          });
          setIsLogged(false);
        });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
