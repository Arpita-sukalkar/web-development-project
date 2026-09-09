import React, { createContext, useContext, useState, useEffect } from 'react';
import { tokenStorage } from '../utils/tokenStorage';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(tokenStorage.getUser());
  const [token, setToken] = useState(tokenStorage.getToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = tokenStorage.getToken();
      if (storedToken) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          tokenStorage.setUser(currentUser);
        } catch {
          // Token expired or invalid
          tokenStorage.clearAll();
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      const { token: jwtToken, user: authUser } = response;

      tokenStorage.setToken(jwtToken);
      tokenStorage.setUser(authUser);

      setToken(jwtToken);
      setUser(authUser);
      return authUser;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      const { token: jwtToken, user: authUser } = response;

      tokenStorage.setToken(jwtToken);
      tokenStorage.setUser(authUser);

      setToken(jwtToken);
      setUser(authUser);
      return authUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    tokenStorage.clearAll();
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
