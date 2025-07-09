'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  id: string;
  email: string;
  exp: number; // expiration timestamp in seconds
};

type User = {
  id: string;
  email: string;
} | null;

export function useAuth() {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decoded = jwtDecode<JwtPayload>(token);

      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        setUser(null);
        return;
      }

      setUser({ id: decoded.id, email: decoded.email });
    } catch {
      console.error('Invalid JWT token');
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  return { user };
}
