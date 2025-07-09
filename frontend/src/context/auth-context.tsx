'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { postClient } from '@/lib/fetchClient'; // adjust the path as needed

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Restore auth state on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await postClient<{
      statusCode: number;
      message: string;
      data: {
        data: {
          accessToken: string;
          user: User;
        }
      };
    }>('/auth/login', { email, password });

    console.log(response);

    const { accessToken, user } = response.data?.data;

    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user?.name));

    setToken(accessToken);
    setUser(user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await postClient<{
      statusCode: number;
      message: string;
      data: {
        accessToken: string;
        user: User;
      };
    }>('/auth/register', { name, email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    setToken(accessToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};
