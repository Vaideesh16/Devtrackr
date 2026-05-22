import { createContext, useContext, useMemo, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

const storedUser = () => {
  try {
    return JSON.parse(localStorage.getItem('devtrackr_user'));
  } catch (_error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(localStorage.getItem('devtrackr_token'));

  const persistSession = (authData) => {
    localStorage.setItem('devtrackr_token', authData.token);
    localStorage.setItem('devtrackr_user', JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  };

  const signup = async (payload) => {
    const data = await authService.signup(payload);
    persistSession(data);
  };

  const login = async (payload) => {
    const data = await authService.login(payload);
    persistSession(data);
  };

  const logout = () => {
    localStorage.removeItem('devtrackr_token');
    localStorage.removeItem('devtrackr_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      signup,
      login,
      logout
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
