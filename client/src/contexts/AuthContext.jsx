import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import api from '../utils/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({
    name: null,
    email: null,
    token: null,
  });

  const navigate = useNavigate();

  const login = useCallback(
    async (data) => {
      const response = await api.post('/api/auth/login', data);
      const user = response.data;
      setIsLogged(true);
      setUser({
        name: user.name,
        email: user.email,
        token: user.token,
      });
      localStorage.setItem('token', user.token);
      navigate('/home');
    },
    [navigate]
  );

  const register = useCallback(async (data) => {
    await api.post('/api/auth/register', data);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/api/auth/verify')
        .then((response) => {
          setIsLogged(true);
          setUser({
            name: response.data.name,
            email: response.data.email,
            token: token,
          });
        })
        .catch((error) => {
          setIsLogged(false);
          setUser({
            name: null,
            email: null,
            token: null,
          });
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
